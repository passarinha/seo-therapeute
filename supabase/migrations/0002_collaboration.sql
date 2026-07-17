-- Accès partagé : un thérapeute peut avoir son propre compte tout en gardant
-- le consultant (propriétaire du cabinet) avec un accès complet, via un lien d'invitation.

create table public.therapist_collaborator (
  id uuid primary key default gen_random_uuid(),
  therapist_id uuid not null references public.therapist_profile(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  invited_by uuid not null references auth.users(id),
  invite_token uuid not null default gen_random_uuid(),
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  unique (invite_token),
  unique (therapist_id, user_id)
);

create index therapist_collaborator_therapist_id_idx on public.therapist_collaborator(therapist_id);
create index therapist_collaborator_user_id_idx on public.therapist_collaborator(user_id);

alter table public.therapist_collaborator enable row level security;

create policy "collaborator_select_owner_or_self" on public.therapist_collaborator
  for select using (
    user_id = auth.uid()
    or exists (
      select 1 from public.therapist_profile t
      where t.id = therapist_collaborator.therapist_id and t.user_id = auth.uid()
    )
  );

create policy "collaborator_insert_owner" on public.therapist_collaborator
  for insert with check (
    exists (
      select 1 from public.therapist_profile t
      where t.id = therapist_collaborator.therapist_id and t.user_id = auth.uid()
    )
  );

create policy "collaborator_delete_owner" on public.therapist_collaborator
  for delete using (
    exists (
      select 1 from public.therapist_profile t
      where t.id = therapist_collaborator.therapist_id and t.user_id = auth.uid()
    )
  );

-- Helper centralisant "propriétaire OU collaborateur accepté" pour toutes les policies.
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

-- therapist_profile : select/update partagés, insert/delete restent au seul propriétaire.
drop policy "therapist_profile_owner" on public.therapist_profile;

create policy "therapist_profile_select" on public.therapist_profile
  for select using (public.has_therapist_access(id));

create policy "therapist_profile_update" on public.therapist_profile
  for update using (public.has_therapist_access(id)) with check (public.has_therapist_access(id));

create policy "therapist_profile_insert" on public.therapist_profile
  for insert with check (user_id = auth.uid());

create policy "therapist_profile_delete" on public.therapist_profile
  for delete using (user_id = auth.uid());

-- Tables enfants : accès complet lecture/écriture pour propriétaire + collaborateurs acceptés.
drop policy "keyword_owner" on public.keyword;
create policy "keyword_access" on public.keyword
  for all using (public.has_therapist_access(therapist_id))
  with check (public.has_therapist_access(therapist_id));

drop policy "competitor_owner" on public.competitor;
create policy "competitor_access" on public.competitor
  for all using (public.has_therapist_access(therapist_id))
  with check (public.has_therapist_access(therapist_id));

drop policy "seo_metric_owner" on public.seo_metric;
create policy "seo_metric_access" on public.seo_metric
  for all using (public.has_therapist_access(therapist_id))
  with check (public.has_therapist_access(therapist_id));

drop policy "gbp_metric_owner" on public.gbp_metric;
create policy "gbp_metric_access" on public.gbp_metric
  for all using (public.has_therapist_access(therapist_id))
  with check (public.has_therapist_access(therapist_id));

drop policy "review_metric_owner" on public.review_metric;
create policy "review_metric_access" on public.review_metric
  for all using (public.has_therapist_access(therapist_id))
  with check (public.has_therapist_access(therapist_id));

drop policy "conversion_metric_owner" on public.conversion_metric;
create policy "conversion_metric_access" on public.conversion_metric
  for all using (public.has_therapist_access(therapist_id))
  with check (public.has_therapist_access(therapist_id));

drop policy "action_item_owner" on public.action_item;
create policy "action_item_access" on public.action_item
  for all using (public.has_therapist_access(therapist_id))
  with check (public.has_therapist_access(therapist_id));

drop policy "report_export_owner" on public.report_export;
create policy "report_export_access" on public.report_export
  for all using (public.has_therapist_access(therapist_id))
  with check (public.has_therapist_access(therapist_id));

-- Fonctions d'invitation : contournent volontairement les policies ci-dessus (security definer)
-- pour ne jamais exposer la liste des invitations en attente à qui que ce soit d'autre
-- que le propriétaire (qui, lui, passe par les policies select/insert/delete normales).
create or replace function public.get_invite_details(p_token uuid)
returns table (therapist_id uuid, cabinet_name text, accepted boolean)
language sql
security definer
set search_path = public
stable
as $$
  select tc.therapist_id, tp.cabinet_name, (tc.accepted_at is not null)
  from public.therapist_collaborator tc
  join public.therapist_profile tp on tp.id = tc.therapist_id
  where tc.invite_token = p_token;
$$;

create or replace function public.accept_invite(p_token uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_therapist_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Vous devez être connecté pour accepter une invitation';
  end if;

  update public.therapist_collaborator
  set user_id = auth.uid(), accepted_at = now()
  where invite_token = p_token and user_id is null
  returning therapist_id into v_therapist_id;

  if v_therapist_id is null then
    raise exception 'Invitation invalide ou déjà utilisée';
  end if;

  return v_therapist_id;
end;
$$;

grant execute on function public.get_invite_details(uuid) to authenticated;
grant execute on function public.accept_invite(uuid) to authenticated;
