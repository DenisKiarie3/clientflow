import { useState } from 'react'
import { clientSchema } from './clientSchema'
import { useAppDispatch } from '../../app/hooks'
import { addClient } from './clientsSlice'

const EMPTY_FORM = { name: '', email: '', company: '', phone: '', notes: '' }

function ClientForm({ onSuccess }) {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const result = clientSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors = {}
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)
    await dispatch(addClient(result.data))
    setIsSubmitting(false)
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <Field label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
      <Field label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
      <Field label="Company" name="company" value={formData.company} onChange={handleChange} error={errors.company} />
      <Field label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-violet text-white text-sm font-medium py-2 rounded-lg hover:bg-violet/90 disabled:opacity-50"
      >
        {isSubmitting ? 'Saving…' : 'Save client'}
      </button>
    </form>
  )
}

function Field({ label, name, type = 'text', value, onChange, error }) {
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
      />
      {error && <span id={`${name}-error`} className="text-xs text-coral-deep">{error}</span>}
    </div>
  )
}

export default ClientForm