import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticatedRequest } from '../../../../lib/admin-auth'
import { createPage, getDefaultCmsBlueprint, listPages } from '../../../../lib/cms-db'

export async function GET(request: NextRequest) {
  if (!isAuthenticatedRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({ pages: listPages() })
}

export async function POST(request: NextRequest) {
  if (!isAuthenticatedRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const blueprint = getDefaultCmsBlueprint()

    const page = createPage({
      name: String(body?.name ?? 'Новая страница'),
      slug: String(body?.slug ?? 'new-page'),
      themeKey: body?.themeKey ?? blueprint.themeKey,
      content: {
        ...blueprint.content,
        hero: {
          ...blueprint.content.hero,
          groomName: String(body?.groomName ?? blueprint.content.hero.groomName),
          brideName: String(body?.brideName ?? blueprint.content.hero.brideName),
          date: String(body?.heroDate ?? blueprint.content.hero.date),
        },
        countdown: {
          ...blueprint.content.countdown,
          groomName: String(body?.groomName ?? blueprint.content.countdown.groomName),
          brideName: String(body?.brideName ?? blueprint.content.countdown.brideName),
        },
        venue: {
          ...blueprint.content.venue,
          name: String(body?.venueName ?? blueprint.content.venue.name),
          mapUrl: String(body?.mapUrl ?? blueprint.content.venue.mapUrl),
        },
        eventDateIso: String(body?.eventDateIso ?? blueprint.content.eventDateIso),
      },
      layout: blueprint.layout,
      isDefault: Boolean(body?.isDefault),
    })

    return NextResponse.json({ page })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Не удалось создать страницу'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
