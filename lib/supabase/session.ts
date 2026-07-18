import { cache } from "react";
import { createClient } from "./server";

/**
 * Mémorisé pour la durée d'une seule requête (React cache) : le layout, la
 * sidebar et la page peuvent chacun appeler cette fonction sans déclencher
 * plusieurs vérifications réseau redondantes auprès de Supabase Auth.
 */
export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});
