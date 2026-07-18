-- Rôle administrateur global : l'email désigné a accès en lecture/écriture à
-- tous les cabinets (quel que soit leur propriétaire), peut gérer les
-- collaborateurs de n'importe quel cabinet, et voir l'email de tout le monde.

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from auth.users u
    where u.id = auth.uid() and u.email = 'mjeande@yahoo.fr'
  );
$$;

create or replace function public.has_therapist_access(p_therapist_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select
    public.is_admin()
    or exists (
      select 1 from public.therapist_profile t
      where t.id = p_therapist_id and t.user_id = auth.uid()
    )
    or exists (
      select 1 from public.therapist_collaborator c
      where c.therapist_id = p_therapist_id and c.user_id = auth.uid() and c.accepted_at is not null
    );
$$;

-- therapist_profile : l'admin peut aussi supprimer n'importe quel cabinet.
drop policy "therapist_profile_delete" on public.therapist_profile;
create policy "therapist_profile_delete" on public.therapist_profile
  for delete using (user_id = auth.uid() or public.is_admin());

-- therapist_collaborator : l'admin peut gérer les invitations/collaborateurs
-- de n'importe quel cabinet (inviter, voir la liste, révoquer).
drop policy "collaborator_select_owner_or_self" on public.therapist_collaborator;
create policy "collaborator_select_owner_or_self" on public.therapist_collaborator
  for select using (
    user_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.therapist_profile t
      where t.id = therapist_collaborator.therapist_id and t.user_id = auth.uid()
    )
  );

drop policy "collaborator_insert_owner" on public.therapist_collaborator;
create policy "collaborator_insert_owner" on public.therapist_collaborator
  for insert with check (
    public.is_admin()
    or exists (
      select 1 from public.therapist_profile t
      where t.id = therapist_collaborator.therapist_id and t.user_id = auth.uid()
    )
  );

drop policy "collaborator_delete_owner" on public.therapist_collaborator;
create policy "collaborator_delete_owner" on public.therapist_collaborator
  for delete using (
    public.is_admin()
    or exists (
      select 1 from public.therapist_profile t
      where t.id = therapist_collaborator.therapist_id and t.user_id = auth.uid()
    )
  );

-- profiles : jusqu'ici un propriétaire ne pouvait pas voir l'email de ses
-- propres collaborateurs (policy "self only"). On l'élargit pour permettre
-- au propriétaire de voir l'email de ses collaborateurs, et à l'admin de
-- voir l'email de tout le monde.
drop policy "profiles_self" on public.profiles;

create policy "profiles_select" on public.profiles
  for select using (
    id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.therapist_collaborator tc
      join public.therapist_profile tp on tp.id = tc.therapist_id
      where tc.user_id = profiles.id and tp.user_id = auth.uid()
    )
  );

create policy "profiles_insert_self" on public.profiles
  for insert with check (id = auth.uid());

create policy "profiles_update_self" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

create policy "profiles_delete_self" on public.profiles
  for delete using (id = auth.uid());
