# SEO Local Therapist Dashboard

Dashboard SEO local pour thérapeutes, psychologues, coachs et praticiens du bien-être : visibilité Google, mots-clés, concurrents, confiance (avis) et conversion (RDV), avec import/export CSV/PDF et un plan d'action priorisé.

## Stack

- **Next.js** (App Router, TypeScript) — front + logique serveur
- **Supabase** — base Postgres + authentification (email/mot de passe)
- **Tailwind CSS** — UI
- **Recharts** — graphiques de tendance
- **@react-pdf/renderer** — export PDF
- **PapaParse** — import/export CSV

## Lancer le projet en local

1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Copier `.env.local.example` en `.env.local` et renseigner les valeurs de ton projet Supabase (Project Settings > API sur [supabase.com/dashboard](https://supabase.com/dashboard)) :
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
3. Créer les tables : ouvre le **SQL Editor** de ton projet Supabase et exécute le contenu de [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql).
4. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```
5. Ouvrir [http://localhost:3000](http://localhost:3000), créer un compte, puis créer ta première fiche cabinet.

## Déployer sur Vercel

1. Pousser ce projet sur un dépôt GitHub.
2. Sur [vercel.com/new](https://vercel.com/new), importer le dépôt.
3. Renseigner les mêmes variables d'environnement que dans `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) dans les réglages du projet Vercel.
4. Déployer. Les mises à jour poussées sur la branche principale se redéploient automatiquement.

## Structure

- `app/(auth)/login` — connexion / inscription
- `app/(dashboard)` — dashboard global, gestion des cabinets, mots-clés, concurrents, performance, plan d'action, import CSV
- `app/api/export` — export CSV et PDF
- `app/api/csv/template` — modèles CSV téléchargeables
- `lib/scoring` — calcul des 4 scores (visibilité, confiance, conversion, opportunité), chacun explicable par ses composantes
- `lib/actions/generateActionPlan.ts` — génération du plan d'action à partir des scores
- `lib/data` — accès aux données Supabase (respecte les policies RLS : chaque utilisateur ne voit que ses propres cabinets)
- `supabase/migrations` — schéma SQL et policies de sécurité (Row Level Security)

## Modèle de données

Un utilisateur peut gérer plusieurs fiches `therapist_profile` (cabinets). Chaque cabinet a ses propres `keyword`, `competitor`, et des métriques mensuelles (`seo_metric`, `gbp_metric`, `review_metric`, `conversion_metric`) ainsi qu'un `action_item` (plan d'action). Les métriques mensuelles sont conçues pour accueillir plus tard une synchronisation automatique avec Google Search Console et Google Business Profile, sans changement de schéma.

## Notes

- L'inscription envoie un email de confirmation (comportement par défaut de Supabase Auth) — l'utilisateur doit cliquer le lien reçu avant de pouvoir se connecter.
- Les scores sont recalculés à la volée à partir des dernières métriques saisies ; ils ne sont pas stockés.
