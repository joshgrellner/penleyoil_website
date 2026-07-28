import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Server-side admin authentication.
 *
 * The admin password is read from the server-only ADMIN_PASSWORD env var
 * (falling back to NEXT_PUBLIC_ADMIN_PASSWORD for backwards compatibility
 * with existing deployments). Session tokens are HMAC-signed with the
 * password itself, so changing the password immediately invalidates all
 * existing sessions.
 *
 * NOTE: This module must only be imported from server code (API routes).
 */

export const ADMIN_SESSION_COOKIE = 'penley_admin_session';

const SESSION_DURATION_SECONDS = 8 * 60 * 60; // 8 hours

export function getSessionMaxAge(): number {
  return SESSION_DURATION_SECONDS;
}

function getAdminPassword(): string | null {
  return (
    process.env.ADMIN_PASSWORD ||
    process.env.NEXT_PUBLIC_ADMIN_PASSWORD ||
    null
  );
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('hex');
}

export function verifyPassword(input: unknown): boolean {
  const password = getAdminPassword();
  if (!password || typeof input !== 'string' || input.length === 0) {
    return false;
  }
  return safeEqual(input, password);
}

export function createSessionToken(): string | null {
  const password = getAdminPassword();
  if (!password) return null;
  const expiresAt = String(Date.now() + SESSION_DURATION_SECONDS * 1000);
  return `${expiresAt}.${sign(expiresAt, password)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const password = getAdminPassword();
  if (!password) return false;

  const dotIndex = token.indexOf('.');
  if (dotIndex === -1) return false;

  const payload = token.slice(0, dotIndex);
  const signature = token.slice(dotIndex + 1);
  if (!payload || !signature) return false;

  if (!safeEqual(signature, sign(payload, password))) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}
