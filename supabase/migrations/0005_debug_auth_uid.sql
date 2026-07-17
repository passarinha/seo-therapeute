-- Fonction de diagnostic temporaire : permet de vérifier ce que auth.uid() renvoie
-- réellement côté base pour une requête donnée (à supprimer une fois le bug résolu).
create or replace function public.debug_auth_uid()
returns uuid
language sql
stable
as $$
  select auth.uid();
$$;

grant execute on function public.debug_auth_uid() to authenticated;
