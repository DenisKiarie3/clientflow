import { useState } from 'react'
import { settingsSchema, CURRENCY_OPTIONS } from './settingsSchema'
import { useAppDispatch } from '../../app/hooks'
import { saveSettings } from './settingsSlice'
import { addToast } from '../ui/uiSlice'
import FormField from '../../components/common/FormField'

function SettingsForm({ initialData }) {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const result = settingsSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors = {}
      result.error.issues.forEach((issue) => { fieldErrors[issue.path[0]] = issue.message })
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    setIsSubmitting(true)
    try {
      await dispatch(saveSettings(result.data)).unwrap()
      dispatch(addToast('Settings saved'))
    } catch (err) {
      dispatch(addToast(err.message ?? 'Could not save settings. Try again.', 'error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 max-w-md">
      <FormField label="Business name" name="businessName" value={formData.businessName} onChange={handleChange} error={errors.businessName} />
      <FormField label="Business email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />

      <div className="flex flex-col gap-1">
        <label htmlFor="currency" className="text-xs font-medium text-slate">Currency</label>
        <select
          id="currency"
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          className="border border-black/10 rounded-lg px-3 py-2 text-base text-ink bg-white"
        >
          {CURRENCY_OPTIONS.map((code) => (
            <option key={code} value={code}>{code}</option>
          ))}
        </select>
      </div>

      <FormField label="Invoice number prefix" name="invoiceNumberPrefix" value={formData.invoiceNumberPrefix} onChange={handleChange} error={errors.invoiceNumberPrefix} />
      <p className="text-xs text-slate -mt-2">New invoices will look like {formData.invoiceNumberPrefix || 'INV'}-000123.</p>

      <button type="submit" disabled={isSubmitting} className="bg-violet text-white text-sm font-medium py-2 rounded-lg hover:bg-violet/90 disabled:opacity-50 self-start px-6">
        {isSubmitting ? 'Saving…' : 'Save settings'}
      </button>
    </form>
  )
}

export default SettingsForm