import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  getSessionMaxAge,
  verifyPassword,
  verifySessionToken,
} from '@/lib/admin-auth';

// Check whether the current session is authenticated
export async function GET(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return NextResponse.json({ authenticated: verifySessionToken(token) });
}

// Log in: validate password server-side and set an httpOnly session cookie
export async function POST(request: NextRequest) {
  let password: unknown;
  try {
    const body = await request.json();
    password = body?.password;
  } catch {
    password = undefined;
  }

  if (!verifyPassword(password)) {
    return NextResponse.json(
      { success: false, error: 'Incorrect password' },
      { status: 401 }
    );
  }

  const token = createSessionToken();
  if (!token) {
    return NextResponse.json(
      { success: false, error: 'Admin password not configured' },
      { status: 500 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: getSessionMaxAge(),
  });
  return response;
}

// Log out: clear the session cookie
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return response;
}
