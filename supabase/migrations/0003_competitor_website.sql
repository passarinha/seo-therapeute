-- Simplification du suivi concurrent : l'URL du site devient l'information principale.
alter table public.competitor add column website_url text;
