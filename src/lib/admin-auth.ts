import type { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_SESSION_COOKIE = 'wedding_admin_session'
const SESSION_VALUE = 'authorized'

function getAdminLogin() {
  return process.env.ADMIN_LOGIN ?? 'admin'
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? 'admin12345'
}

export function verifyAdminCredentials(login: string, password: string) {
  return login === getAdminLogin() && password === getAdminPassword()
}

export function isAuthenticatedRequest(request: NextRequest) {
  return request.cookies.get(ADMIN_SESSION_COOKIE)?.value === SESSION_VALUE
}

export async function isAuthenticatedServer() {
  const store = await cookies()
  return store.get(ADMIN_SESSION_COOKIE)?.value === SESSION_VALUE
}

export function setAdminSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: SESSION_VALUE,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  })
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
}
