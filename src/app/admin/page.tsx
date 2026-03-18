import { AdminDashboard } from '../../components/admin/AdminDashboard'
import { AdminLogin } from '../../components/admin/AdminLogin'
import { isAuthenticatedServer } from '../../lib/admin-auth'
import { listPages } from '../../lib/cms-db'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const authenticated = await isAuthenticatedServer()

  if (!authenticated) {
    return <AdminLogin />
  }

  return <AdminDashboard initialPages={listPages()} />
}
