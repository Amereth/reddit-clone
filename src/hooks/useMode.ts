import useLocalStorageState from 'use-local-storage-state'

export type Mode = 'light' | 'dark'

export const useMode = () => {
  const [mode, setMode] = useLocalStorageState('mode', {
    defaultValue: 'light',
  })

  return {
    mode,
    setMode,
    isLightMode: mode === 'light',
    isDarkMode: mode === 'dark',
  }
}
