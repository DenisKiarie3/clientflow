import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchSettings, selectSettingsData, selectSettingsStatus } from '../features/settings/settingsSlice'
import SettingsForm from '../features/settings/SettingsForm'

function SettingsPage() {
  const dispatch = useAppDispatch()
  const settings = useAppSelector(selectSettingsData)
  const status = useAppSelector(selectSettingsStatus)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchSettings())
  }, [status, dispatch])

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-display font-bold text-xl text-ink">Settings</h2>
      {status === 'loading' || !settings ? (
        <p className="text-sm text-slate">Loading settings…</p>
      ) : (
        <SettingsForm initialData={settings} />
      )}
    </div>
  )
}

export default SettingsPage