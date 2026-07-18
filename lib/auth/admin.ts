export const ADMIN_EMAIL = "mjeande@yahoo.fr";

export function isAdminEmail(email: string | null | undefined): boolean {
  return email === ADMIN_EMAIL;
}
