import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchInvoices, selectInvoicesStatus } from '../features/invoices/invoicesSlice'
import { fetchClients, selectClientsStatus } from '../features/clients/clientsSlice'
import { selectDashboardStats, selectRecentInvoices } from '../features/dashboard/dashboardSelectors'
import StatCard from '../features/dashboard/StatCard'
import RecentInvoices from '../features/dashboard/RecentInvoices'
import { formatCurrency } from '../utils/formatCurrency'
import { ROUTES } from '../constants/routes'
import { fetchSettings, selectSettingsData, selectSettingsStatus } from '../features/settings/settingsSlice'
import { StatCardSkeleton } from '../components/common/Skeletons'
import { CardSkeleton } from '../components/common/Skeletons'

function DashboardPage() {
  const dispatch = useAppDispatch()
  const invoicesStatus = useAppSelector(selectInvoicesStatus)
  const clientsStatus = useAppSelector(selectClientsStatus)
  const stats = useAppSelector(selectDashboardStats)
  const recentInvoices = useAppSelector(selectRecentInvoices)
  const settings = useAppSelector(selectSettingsData)
  const settingsStatus = useAppSelector(selectSettingsStatus)

  useEffect(() => {
    if (invoicesStatus === 'idle') dispatch(fetchInvoices())
    if (clientsStatus === 'idle') dispatch(fetchClients())
    if (settingsStatus === 'idle') dispatch(fetchSettings())
  }, [invoicesStatus, clientsStatus, settingsStatus, dispatch])

  const isLoading = invoicesStatus === 'loading' || clientsStatus === 'loading' || settingsStatus === 'loading'
  const currency = settings?.currency || 'USD'

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-display font-bold text-xl text-ink">Dashboard</h2>

      {isLoading ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="status" aria-live="polite" aria-busy="true">
            <span className="sr-only">Loading dashboard…</span>
            {Array.from({ length: 3 }).map((_, i) => <StatCardSkeleton key={i} />)}
          </div>
          <div className="flex flex-col gap-2" aria-hidden="true">
            {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatCard label="Outstanding" value={formatCurrency(stats.outstandingTotal, currency)} accentColor="border-violet" />
            <StatCard label="Paid this month" value={formatCurrency(stats.paidThisMonthTotal, currency)} accentColor="border-green" />
            <StatCard label="Overdue" value={stats.overdueCount} accentColor="border-coral" />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-ink">Recent invoices</h3>
              <Link to={ROUTES.INVOICES} className="text-sm text-violet-deep font-medium">View all</Link>
            </div>
            <RecentInvoices invoices={recentInvoices} currency={currency} />
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardPage