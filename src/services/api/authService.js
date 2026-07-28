const STORAGE_KEY = 'clientflow_auth'
const DELAY_MS = 400

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// This "database" and the password check below are mock-only conveniences.
// A real backend never trusts the client to check a password — Django will
// hash it server-side and this whole file gets deleted, not translated.
const MOCK_USERS = [
  { id: 'user_001', name: 'Jordan Diaz', email: 'jordan@example.com', password: 'password123' },
]

export async function login({ email, password }) {
  await delay(DELAY_MS)
  const user = MOCK_USERS.find((u) => u.email === email && u.password === password)
  if (!user) throw new Error('Invalid email or password')
  const { password: _password, ...safeUser } = user
  const session = { user: safeUser, token: `mock_token_${user.id}` }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  return session
}

export async function logout() {
  await delay(150)
  localStorage.removeItem(STORAGE_KEY)
}

export function getPersistedSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}