# Connecting ClientFlow to a Django backend

This project was deliberately architected so that adding a real backend later touches a small, predictable set of files. This doc is the map for that work when it happens.

## What changes

### 1. `src/services/api/*.js` — the actual swap point
Every function here (`getClients`, `createInvoice`, etc.) currently reads/writes a local JS array with a simulated delay. Each one becomes a real HTTP call:

```js
// Before
export async function getClients() {
  await delay(400)
  return [...clients]
}

// After
export async function getClients() {
  const res = await apiClient.get('/api/clients/')
  return res.data
}
```

Nothing in any Redux slice, component, or page changes — they only ever call these function names, never `fetch` directly.

### 2. `src/services/api/apiClient.js` — new file
A configured axios instance (or `fetch` wrapper) with the Django base URL and, once auth is real, an interceptor that attaches the session/JWT token to every request automatically.

### 3. `src/services/api/mockData/*.json` — deleted
No longer needed once a real database exists.

### 4. `src/features/auth/authSlice.js` and `authService.js`
The biggest conceptual change. `authService.login` currently checks a hardcoded array client-side — that's a simulation, never real security. It becomes a real POST to Django's auth endpoint, which returns a session cookie or JWT. `getPersistedSession()` may become unnecessary if Django uses httpOnly session cookies (the browser handles persistence automatically); it stays relevant if using token-based auth instead.

### 5. Environment variables
A `.env` file (gitignored) holding `VITE_API_BASE_URL`, switched between local Django (`http://localhost:8000`) and production.

### 6. CORS
Django will need `django-cors-headers` configured to accept requests from the Vite dev server's origin during development, and the deployed Netlify origin in production.

## What does NOT change

- Every Redux slice's structure (`createEntityAdapter`, `createAsyncThunk`, `extraReducers`)
- Every component and page
- The design tokens, routing, form validation schemas
- The overall folder structure

That's the actual payoff of the service-layer pattern established in Phase 2: the backend is a swap, not a rewrite.