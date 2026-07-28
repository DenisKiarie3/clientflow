import settingsData from './mockData/settings.json'

const DELAY_MS = 400

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

let settings = { ...settingsData }

export async function getSettings() {
  await delay(DELAY_MS)
  return { ...settings }
}

export async function updateSettings(updates) {
  await delay(DELAY_MS)
  settings = { ...settings, ...updates }
  return { ...settings }
}