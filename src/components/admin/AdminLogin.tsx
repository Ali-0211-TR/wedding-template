"use client"

import { useState } from 'react'

export function AdminLogin() {
  const [login, setLogin] = useState('admin')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      })

      if (!response.ok) {
        const body = (await response.json()) as { error?: string }
        throw new Error(body.error ?? 'Ошибка авторизации')
      }

      window.location.reload()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Не удалось войти')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7fb] via-[#f7ebe2] to-[#eef6ef] px-4 py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-white/50 bg-white/70 p-8 shadow-soft backdrop-blur-xl">
        <h1 className="text-center font-display text-5xl text-ink">Admin</h1>
        <p className="mt-3 text-center text-sm text-ink/70">Локальная админка приглашений</p>

        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.24em] text-ink/65">Логин</span>
            <input
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              className="w-full rounded-xl border border-white/60 bg-white/80 px-4 py-3 text-ink outline-none"
              autoComplete="username"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.24em] text-ink/65">Пароль</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-white/60 bg-white/80 px-4 py-3 text-ink outline-none"
              autoComplete="current-password"
            />
          </label>

          {error ? (
            <p className="rounded-xl border border-red-300/60 bg-red-50/70 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-ink px-5 py-3 text-sm uppercase tracking-[0.24em] text-white disabled:opacity-60"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  )
}
