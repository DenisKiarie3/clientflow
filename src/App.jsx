import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import PageLoadingFallback from './components/common/PageLoadingFallback'
import { ROUTES } from './constants/routes'
import ToastContainer from './components/common/ToastContainer'

const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const ClientsPage = lazy(() => import('./pages/ClientsPage'))
const ClientDetailPage = lazy(() => import('./pages/ClientDetailPage'))
const InvoicesPage = lazy(() => import('./pages/InvoicesPage'))
const InvoiceCreatePage = lazy(() => import('./pages/InvoiceCreatePage'))
const InvoiceDetailPage = lazy(() => import('./pages/InvoiceDetailPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function App() {
  return (
    <>
      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route element={<AppLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.CLIENTS} element={<ClientsPage />} />
            <Route path={ROUTES.CLIENT_DETAIL} element={<ClientDetailPage />} />
            <Route path={ROUTES.INVOICES} element={<InvoicesPage />} />
            <Route path={ROUTES.INVOICE_CREATE} element={<InvoiceCreatePage />} />
            <Route path={ROUTES.INVOICE_DETAIL} element={<InvoiceDetailPage />} />
            <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </>
    
  )
}

export default App