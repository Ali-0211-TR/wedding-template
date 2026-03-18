import { notFound } from 'next/navigation'
import { CmsInvitation } from '../../components/CmsInvitation'
import { getPageBySlug } from '../../lib/cms-db'

export const dynamic = 'force-dynamic'

interface SlugPageProps {
  params: Promise<{ slug: string }>
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params
  const page = getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return <CmsInvitation page={page} />
}
