import { NextResponse } from 'next/server'
import { setAdminSessionCookie, verifyAdminCredentials } from '../../../lib/admin-auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const login = String(body?.login ?? '')
    const password = String(body?.password ?? '')

    if (!verifyAdminCredentials(login, password)) {
      return NextResponse.json({ error: 'Неверный логин или пароль' }, { status: 401 })
    }

    const response = NextResponse.json({ ok: true })
    setAdminSessionCookie(response)

    return response
  } catch {
    return NextResponse.json({ error: 'Некорректный запрос' }, { status: 400 })
  }
}
