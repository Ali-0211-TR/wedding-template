import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticatedRequest } from '../../../../../lib/admin-auth'
import { getPageById, updatePage } from '../../../../../lib/cms-db'

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: Params) {
  if (!isAuthenticatedRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const page = getPageById(Number(id))

  if (!page) {
    return NextResponse.json({ error: 'Страница не найдена' }, { status: 404 })
  }

  return NextResponse.json({ page })
}

export async function PATCH(request: NextRequest, { params }: Params) {
  if (!isAuthenticatedRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const body = await request.json()

    const page = updatePage(Number(id), {
      name: body?.name,
      slug: body?.slug,
      themeKey: body?.themeKey,
      content: body?.content,
      layout: body?.layout,
    })

    return NextResponse.json({ page })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Не удалось обновить страницу'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
