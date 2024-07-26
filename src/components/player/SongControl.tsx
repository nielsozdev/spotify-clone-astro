import { useEffect, useState } from 'react'

import { Slider } from '@components/ui/atoms/Slider'
import { formatDuration } from '@utils/formatter'

type Audio = React.RefObject<HTMLAudioElement>
interface Props {
  audio: Audio
  disabled?: boolean
  isMobile?: boolean
}
export function SongControl ({ audio, disabled = false, isMobile = false }: Props) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const handleTimeUpdate = () => {
    setCurrentTime(audio?.current?.currentTime ?? 0)
  }

  useEffect(() => {
    const handleLoadedMetadata = () => {
      if (audio.current) {
        setDuration(audio.current.duration)
        setCurrentTime(0.01)
      }
    }

    const currentAudio = audio.current
    if (currentAudio) {
      currentAudio.addEventListener('timeupdate', handleTimeUpdate)
      currentAudio.addEventListener('loadedmetadata', handleLoadedMetadata)
    }

    return () => {
      if (currentAudio) {
        currentAudio.removeEventListener('timeupdate', handleTimeUpdate)
        currentAudio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      }
    }
  }, [audio])
  return (
    <div className='w-full flex gap-x-2 mb-[-10px]'>
      {!isMobile && <span className='opacity-50 w-12 text-right'>{currentTime ? formatDuration(currentTime).format : '--:--'}</span>}
      <Slider
        className={'w-[100%]' + (disabled ? ' opacity-50 cursor-not-allowed' : '')}
        max={duration}
        min={0}
        value={[currentTime]}
        onValueChange={
          (value) => {
            if (audio?.current) {
              const [newCurrentTime] = value
              audio.current.currentTime = newCurrentTime
            }
          }
        }
      />
      {!isMobile && <span className='opacity-50 w-12'>{duration ? formatDuration(duration).format : '--:--'}</span>}
    </div>
  )
}
