import { memo } from 'react'
function StatCard({ label, value, accentColor }) {
  return (
    <div className={`bg-white rounded-xl px-4 py-3.5 border-l-4 ${accentColor}`}>
      <p className="text-xs text-slate">{label}</p>
      <p className="font-display font-bold text-xl md:text-2xl text-ink mt-1">{value}</p>
    </div>
  )
}

export default memo(StatCard)