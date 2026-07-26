import { RiMenuLine } from 'react-icons/ri'

function Topbar({ onMenuClick }) {
  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-black/5 bg-white">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} aria-label="Open menu" className="md:hidden p-2 -ml-2 text-ink">
          <RiMenuLine className="text-xl" aria-hidden="true" />
        </button>
        <h1 className="font-display font-bold text-lg text-ink">Overview</h1>
      </div>
      <div className="w-9 h-9 rounded-full bg-violet/10 text-violet-deep flex items-center justify-center text-sm font-medium">
        JD
      </div>
    </header>
  )
}

export default Topbar