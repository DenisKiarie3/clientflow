import { useState } from 'react'
import { clientSchema } from './clientSchema'
import { useAppDispatch } from '../../app/hooks'
import { addClient, editClient } from './clientsSlice'
import FormField from '../../components/common/FormField'
import { addToast } from '../ui/uiSlice'

const EMPTY_FORM = { name: '', email: '', company: '', phone: '', notes: '' }

function ClientForm({ initialData, onSuccess }) {
  const dispatch = useAppDispatch()
  const isEditing = Boolean(initialData)
  const [formData, setFormData] = useState(initialData ?? EMPTY_FORM)
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
    try {
      if (isEditing) {
        await dispatch(editClient({ clientId: initialData.id, updates: result.data })).unwrap()
        dispatch(addToast('Client updated'))
      } else {
        await dispatch(addClient(result.data)).unwrap()
        dispatch(addToast('Client added'))
      }
      onSuccess?.()
    } catch (err) {
      dispatch(addToast(err.message ?? 'Could not save client. Try again.', 'error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <FormField label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
      <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
      <FormField label="Company" name="company" value={formData.company} onChange={handleChange} error={errors.company} />
      <FormField label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} />

      <div className="flex flex-col gap-1">
        <label htmlFor="notes" className="text-xs font-medium text-slate">Notes</label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          className="border border-black/10 rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-violet/40 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-violet text-white text-sm font-medium py-2 rounded-lg hover:bg-violet/90 disabled:opacity-50"
      >
        {isSubmitting ? 'Saving…' : isEditing ? 'Save changes' : 'Save client'}
      </button>
    </form>
  )
}

export default ClientForm