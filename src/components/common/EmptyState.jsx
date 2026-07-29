function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 py-12 px-4">
      {Icon && (
        <div className="w-12 h-12 rounded-full bg-violet/10 text-violet-deep flex items-center justify-center">
          <Icon className="text-xl" aria-hidden="true" />
        </div>
      )}
      <div>
        <p className="font-display font-bold text-base text-ink">{title}</p>
        <p className="text-sm text-slate mt-1 max-w-xs">{description}</p>
      </div>
      {action}
    </div>
  )
}

export default EmptyState