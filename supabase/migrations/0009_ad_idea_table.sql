-- Les annonces Google Ads deviennent éditables et persistantes (au lieu d'être
-- recalculées à chaque affichage), pour permettre de modifier leur texte et
-- d'en ajouter de nouvelles, comme dans l'éditeur d'annonces Google Ads.
create table public.ad_idea (
  id uuid primary key default gen_random_uuid(),
  therapist_id uuid not null references public.therapist_profile(id) on delete cascade,
  keyword_id uuid not null references public.keyword(id) on delete cascade,
  headline text not null,
  description text not null,
  position int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index ad_idea_therapist_id_idx on public.ad_idea(therapist_id);
create index ad_idea_keyword_id_idx on public.ad_idea(keyword_id);

alter table public.ad_idea enable row level security;

create policy "ad_idea_access" on public.ad_idea
  for all using (public.has_therapist_access(therapist_id))
  with check (public.has_therapist_access(therapist_id));
