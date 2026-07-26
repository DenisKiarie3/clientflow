import { useState } from 'react'
import { clientSchema } from './clientSchema'
import { useAppDispatch } from '../../app/hooks'
import { addClient } from './clientsSlice'
import FormField from '../../components/common/FormField'

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
      <FormField label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
      <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
      <FormField label="Company" name="company" value={formData.company} onChange={handleChange} error={errors.company} />
      <FormField label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} />

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

export default ClientForm