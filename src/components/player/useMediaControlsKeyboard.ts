import { useEffect } from 'react'

import { usePlayerStore } from '@store/player.store'

export function useMediaControlsKeyboard () {
  const { isPlaying, setIsPlaying } = usePlayerStore((state) => state)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyValue = event.key

      if (keyValue === 'MediaPlayPause') {
        setIsPlaying(!isPlaying)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isPlaying])
}
