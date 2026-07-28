import { RiSearchLine } from 'react-icons/ri'

function SearchInput({ value, onChange, placeholder = 'Search…' }) {
  return (
    <div className="relative">
      <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate text-base" aria-hidden="true" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full border border-black/10 rounded-lg pl-9 pr-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-violet/40"
      />
    </div>
  )
}

export default SearchInput