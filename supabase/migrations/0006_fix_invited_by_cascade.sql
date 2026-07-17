-- La colonne invited_by n'avait pas "on delete cascade", ce qui empêchait
-- Supabase de supprimer un utilisateur ayant généré une invitation.
alter table public.therapist_collaborator
  drop constraint if exists therapist_collaborator_invited_by_fkey;

alter table public.therapist_collaborator
  add constraint therapist_collaborator_invited_by_fkey
  foreign key (invited_by) references auth.users(id) on delete cascade;
