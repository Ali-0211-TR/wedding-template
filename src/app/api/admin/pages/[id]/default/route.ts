import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticatedRequest } from '../../../../../../lib/admin-auth'
import { setDefaultPage } from '../../../../../../lib/cms-db'

interface Params {
  params: Promise<{ id: string }>
}

export async function POST(request: NextRequest, { params }: Params) {
  if (!isAuthenticatedRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const page = setDefaultPage(Number(id))
    return NextResponse.json({ page })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Не удалось назначить дефолтную страницу'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
