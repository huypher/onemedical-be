export function getToken(auth: string): string {
  return auth.replace('Bearer ', '');
}
