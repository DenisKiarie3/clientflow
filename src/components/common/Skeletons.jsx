export function CardSkeleton() {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl border border-black/5 px-4 py-3">
      <div className="flex flex-col gap-2">
        <div className="h-3.5 w-32 bg-black/5 rounded animate-pulse" />
        <div className="h-3 w-44 bg-black/5 rounded animate-pulse" />
      </div>
      <div className="h-3 w-16 bg-black/5 rounded animate-pulse" />
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-xl px-4 py-3.5 border-l-4 border-black/5">
      <div className="h-3 w-20 bg-black/5 rounded animate-pulse" />
      <div className="h-6 w-24 bg-black/5 rounded animate-pulse mt-2" />
    </div>
  )
}