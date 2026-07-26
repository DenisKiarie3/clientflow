function FormField({ label, name, type = 'text', value, onChange, error, ...rest }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-xs font-medium text-slate">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`border rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-violet/40 ${
          error ? 'border-coral' : 'border-black/10'
        }`}
        {...rest}
      />
      {error && <span id={`${name}-error`} className="text-xs text-coral-deep">{error}</span>}
    </div>
  )
}

export default FormField