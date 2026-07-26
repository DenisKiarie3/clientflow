import clientsData from './mockData/clients.json'

const DELAY_MS = 400

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

let clients = [...clientsData]

export async function getClients() {
  await delay(DELAY_MS)
  return [...clients]
}

export async function getClientById(clientId) {
  await delay(DELAY_MS)
  const client = clients.find((c) => c.id === clientId)
  if (!client) throw new Error(`Client ${clientId} not found`)
  return client
}

export async function createClient(clientData) {
  await delay(DELAY_MS)
  const newClient = { id: `client_${Date.now()}`, ...clientData }
  clients = [...clients, newClient]
  return newClient
}

export async function updateClient(clientId, updates) {
  await delay(DELAY_MS)
  clients = clients.map((c) => (c.id === clientId ? { ...c, ...updates } : c))
  return clients.find((c) => c.id === clientId)
}

export async function deleteClient(clientId) {
  await delay(DELAY_MS)
  clients = clients.filter((c) => c.id !== clientId)
  return clientId
}