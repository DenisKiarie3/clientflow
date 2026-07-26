import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { RiDashboardLine, RiTeamLine, RiFileList3Line, RiSettings4Line, RiCloseLine } from 'react-icons/ri'
import { ROUTES } from '../../constants/routes'

const NAV_ITEMS = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard', icon: RiDashboardLine, end: true },
  { to: ROUTES.CLIENTS, label: 'Clients', icon: RiTeamLine },
  { to: ROUTES.INVOICES, label: 'Invoices', icon: RiFileList3Line },
  { to: ROUTES.SETTINGS, label: 'Settings', icon: RiSettings4Line },
]

function SidebarLinks({ onNavigate }) {
  return NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
    <NavLink
      key={to}
      to={to}
      end={end}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isActive ? 'bg-violet text-white' : 'text-slate hover:bg-white/5 hover:text-paper'
        }`
      }
    >
      <Icon className="text-lg" aria-hidden="true" />
      {label}
    </NavLink>
  ))
}

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <nav className="hidden md:flex w-60 shrink-0 bg-ink text-paper flex-col p-4 gap-1" aria-label="Main navigation">
        <span className="font-display font-bold text-lg px-2 mb-6">ClientFlow</span>
        <SidebarLinks />
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              aria-hidden="true"
            />
            <motion.nav
              className="fixed inset-y-0 left-0 w-64 bg-ink text-paper flex flex-col p-4 gap-1 z-50 md:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              aria-label="Main navigation"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-display font-bold text-lg px-2">ClientFlow</span>
                <button onClick={onClose} aria-label="Close menu" className="p-2 text-paper">
                  <RiCloseLine className="text-xl" aria-hidden="true" />
                </button>
              </div>
              <SidebarLinks onNavigate={onClose} />
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar