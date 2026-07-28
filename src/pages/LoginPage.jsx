import LoginForm from '../features/auth/LoginForm'

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <span className="font-display font-bold text-2xl text-ink">ClientFlow</span>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage