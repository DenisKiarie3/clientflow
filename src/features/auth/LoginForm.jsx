import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { z } from 'zod'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { login, selectAuthStatus, selectAuthError } from './authSlice'
import FormField from '../../components/common/FormField'
import { ROUTES } from '../../constants/routes'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

function LoginForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const status = useAppSelector(selectAuthStatus)
  const authError = useAppSelector(selectAuthError)

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const result = loginSchema.safeParse(formData)
    if (!result.success) {
      const errors = {}
      result.error.issues.forEach((issue) => { errors[issue.path[0]] = issue.message })
      setFieldErrors(errors)
      return
    }
    setFieldErrors({})
    try {
      await dispatch(login(result.data)).unwrap()
      const destination = location.state?.from?.pathname ?? ROUTES.DASHBOARD
      navigate(destination, { replace: true })
    } catch {
      // authError below already reflects the failure — nothing else to do here
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 w-full">
      <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={fieldErrors.email} />
      <FormField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} error={fieldErrors.password} />
      {authError && <p className="text-xs text-coral-deep">{authError}</p>}
      <button type="submit" disabled={status === 'loading'} className="bg-violet text-white text-sm font-medium py-2 rounded-lg hover:bg-violet/90 disabled:opacity-50">
        {status === 'loading' ? 'Signing in…' : 'Sign in'}
      </button>
      <p className="text-xs text-slate text-center">Demo login: jordan@example.com / password123</p>
    </form>
  )
}

export default LoginForm