-- SEO Local Therapist Dashboard — schéma initial

create extension if not exists "pgcrypto";

-- Profils utilisateurs (1:1 avec auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now()
);

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Fiche thérapeute (un cabinet géré par un utilisateur, potentiellement plusieurs par consultant)
create table public.therapist_profile (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  cabinet_name text not null,
  therapist_name text,
  specialty text,
  city text,
  target_area text,
  address text,
  website_url text,
  gbp_url text,
  booking_url text,
  phone text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index therapist_profile_user_id_idx on public.therapist_profile(user_id);

-- Mots-clés cibles
create table public.keyword (
  id uuid primary key default gen_random_uuid(),
  therapist_id uuid not null references public.therapist_profile(id) on delete cascade,
  keyword text not null,
  search_intent text,
  location text,
  volume_estimate integer,
  difficulty integer check (difficulty between 0 and 100),
  current_position integer,
  target_url text,
  priority text check (priority in ('low','medium','high')) default 'medium',
  status text check (status in ('todo','in_progress','done')) default 'todo',
  updated_at timestamptz not null default now()
);

create index keyword_therapist_id_idx on public.keyword(therapist_id);

-- Concurrents locaux
create table public.competitor (
  id uuid primary key default gen_random_uuid(),
  therapist_id uuid not null references public.therapist_profile(id) on delete cascade,
  name text not null,
  city text,
  keyword_positions jsonb default '{}'::jsonb,
  review_count integer,
  avg_rating numeric(2,1),
  offer_type text,
  differentiation text,
  opportunity text,
  updated_at timestamptz not null default now()
);

create index competitor_therapist_id_idx on public.competitor(therapist_id);

-- Métriques SEO (Search Console) — une ligne par mois
create table public.seo_metric (
  id uuid primary key default gen_random_uuid(),
  therapist_id uuid not null references public.therapist_profile(id) on delete cascade,
  period_date date not null,
  impressions integer default 0,
  clicks integer default 0,
  ctr numeric(5,2) default 0,
  avg_position numeric(5,2) default 0,
  unique (therapist_id, period_date)
);

create index seo_metric_therapist_id_idx on public.seo_metric(therapist_id);

-- Métriques Google Business Profile — une ligne par mois
create table public.gbp_metric (
  id uuid primary key default gen_random_uuid(),
  therapist_id uuid not null references public.therapist_profile(id) on delete cascade,
  period_date date not null,
  profile_views integer default 0,
  calls integer default 0,
  direction_requests integer default 0,
  website_clicks integer default 0,
  messages integer default 0,
  bookings integer default 0,
  unique (therapist_id, period_date)
);

create index gbp_metric_therapist_id_idx on public.gbp_metric(therapist_id);

-- Métriques de confiance (avis) — une ligne par mois
create table public.review_metric (
  id uuid primary key default gen_random_uuid(),
  therapist_id uuid not null references public.therapist_profile(id) on delete cascade,
  period_date date not null,
  review_count integer default 0,
  avg_rating numeric(2,1) default 0,
  freshness_days integer default 0,
  response_rate numeric(5,2) default 0,
  nap_consistency boolean default true,
  contact_page_quality integer check (contact_page_quality between 0 and 100) default 50,
  unique (therapist_id, period_date)
);

create index review_metric_therapist_id_idx on public.review_metric(therapist_id);

-- Métriques de conversion — une ligne par mois
create table public.conversion_metric (
  id uuid primary key default gen_random_uuid(),
  therapist_id uuid not null references public.therapist_profile(id) on delete cascade,
  period_date date not null,
  booking_clicks integer default 0,
  phone_clicks integer default 0,
  form_submissions integer default 0,
  messages_received integer default 0,
  unique (therapist_id, period_date)
);

create index conversion_metric_therapist_id_idx on public.conversion_metric(therapist_id);

-- Plan d'action
create table public.action_item (
  id uuid primary key default gen_random_uuid(),
  therapist_id uuid not null references public.therapist_profile(id) on delete cascade,
  title text not null,
  category text,
  impact_estimate text check (impact_estimate in ('low','medium','high')) default 'medium',
  status text check (status in ('todo','in_progress','done')) default 'todo',
  created_at timestamptz not null default now()
);

create index action_item_therapist_id_idx on public.action_item(therapist_id);

-- Historique des exports
create table public.report_export (
  id uuid primary key default gen_random_uuid(),
  therapist_id uuid not null references public.therapist_profile(id) on delete cascade,
  type text check (type in ('csv','pdf')) not null,
  created_at timestamptz not null default now()
);

create index report_export_therapist_id_idx on public.report_export(therapist_id);

-- Row Level Security : chaque utilisateur ne voit que ses propres cabinets et données associées
alter table public.profiles enable row level security;
alter table public.therapist_profile enable row level security;
alter table public.keyword enable row level security;
alter table public.competitor enable row level security;
alter table public.seo_metric enable row level security;
alter table public.gbp_metric enable row level security;
alter table public.review_metric enable row level security;
alter table public.conversion_metric enable row level security;
alter table public.action_item enable row level security;
alter table public.report_export enable row level security;

create policy "profiles_self" on public.profiles
  for all using (id = auth.uid()) with check (id = auth.uid());

create policy "therapist_profile_owner" on public.therapist_profile
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "keyword_owner" on public.keyword
  for all using (
    exists (select 1 from public.therapist_profile t where t.id = keyword.therapist_id and t.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.therapist_profile t where t.id = keyword.therapist_id and t.user_id = auth.uid())
  );

create policy "competitor_owner" on public.competitor
  for all using (
    exists (select 1 from public.therapist_profile t where t.id = competitor.therapist_id and t.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.therapist_profile t where t.id = competitor.therapist_id and t.user_id = auth.uid())
  );

create policy "seo_metric_owner" on public.seo_metric
  for all using (
    exists (select 1 from public.therapist_profile t where t.id = seo_metric.therapist_id and t.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.therapist_profile t where t.id = seo_metric.therapist_id and t.user_id = auth.uid())
  );

create policy "gbp_metric_owner" on public.gbp_metric
  for all using (
    exists (select 1 from public.therapist_profile t where t.id = gbp_metric.therapist_id and t.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.therapist_profile t where t.id = gbp_metric.therapist_id and t.user_id = auth.uid())
  );

create policy "review_metric_owner" on public.review_metric
  for all using (
    exists (select 1 from public.therapist_profile t where t.id = review_metric.therapist_id and t.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.therapist_profile t where t.id = review_metric.therapist_id and t.user_id = auth.uid())
  );

create policy "conversion_metric_owner" on public.conversion_metric
  for all using (
    exists (select 1 from public.therapist_profile t where t.id = conversion_metric.therapist_id and t.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.therapist_profile t where t.id = conversion_metric.therapist_id and t.user_id = auth.uid())
  );

create policy "action_item_owner" on public.action_item
  for all using (
    exists (select 1 from public.therapist_profile t where t.id = action_item.therapist_id and t.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.therapist_profile t where t.id = action_item.therapist_id and t.user_id = auth.uid())
  );

create policy "report_export_owner" on public.report_export
  for all using (
    exists (select 1 from public.therapist_profile t where t.id = report_export.therapist_id and t.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.therapist_profile t where t.id = report_export.therapist_id and t.user_id = auth.uid())
  );
