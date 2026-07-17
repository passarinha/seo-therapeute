-- Script de réparation idempotent : rétablit l'état attendu des policies sur
-- therapist_profile et la fonction has_therapist_access, sans danger à ré-exécuter.

create or replace function public.has_therapist_access(p_therapist_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.therapist_profile t
    where t.id = p_therapist_id and t.user_id = auth.uid()
  ) or exists (
    select 1 from public.therapist_collaborator c
    where c.therapist_id = p_therapist_id and c.user_id = auth.uid() and c.accepted_at is not null
  );
$$;

drop policy if exists "therapist_profile_owner" on public.therapist_profile;
drop policy if exists "therapist_profile_select" on public.therapist_profile;
drop policy if exists "therapist_profile_update" on public.therapist_profile;
drop policy if exists "therapist_profile_insert" on public.therapist_profile;
drop policy if exists "therapist_profile_delete" on public.therapist_profile;

create policy "therapist_profile_select" on public.therapist_profile
  for select using (public.has_therapist_access(id));

create policy "therapist_profile_update" on public.therapist_profile
  for update using (public.has_therapist_access(id)) with check (public.has_therapist_access(id));

create policy "therapist_profile_insert" on public.therapist_profile
  for insert with check (user_id = auth.uid());

create policy "therapist_profile_delete" on public.therapist_profile
  for delete using (user_id = auth.uid());
