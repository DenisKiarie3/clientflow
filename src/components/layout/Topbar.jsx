import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RiMenuLine, RiLogoutBoxRLine } from 'react-icons/ri'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout, selectCurrentUser } from '../../features/auth/authSlice'
import { ROUTES } from '../../constants/routes'

function getInitials(name) {
  if (!name) return '?'
  return name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()
}

function Topbar({ onMenuClick }) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(selectCurrentUser)
  const [isMenuOpen, setMenuOpen] = useState(false)

  async function handleLogout() {
    await dispatch(logout())
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-black/5 bg-white relative">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} aria-label="Open menu" className="md:hidden p-2 -ml-2 text-ink">
          <RiMenuLine className="text-xl" aria-hidden="true" />
        </button>
        <h1 className="font-display font-bold text-lg text-ink">Overview</h1>
      </div>
      <div className="relative">
        <button
          onClick={() => setMenuOpen((open) => !open)}
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
          className="w-9 h-9 rounded-full bg-violet/10 text-violet-deep flex items-center justify-center text-sm font-medium"
        >
          {getInitials(user?.name)}
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 top-11 bg-white border border-black/5 rounded-lg shadow-lg py-1 min-w-[170px] z-10">
            <p className="px-3 py-2 text-xs text-slate border-b border-black/5">{user?.email}</p>
            <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-black/5 text-left">
              <RiLogoutBoxRLine aria-hidden="true" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Topbar