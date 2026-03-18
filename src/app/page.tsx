import { CmsInvitation } from '../components/CmsInvitation'
import { getDefaultPage } from '../lib/cms-db'

export const dynamic = 'force-dynamic'

export default function Page() {
  const page = getDefaultPage()

  if (!page) {
    return null
  }

  return <CmsInvitation page={page} />
}
