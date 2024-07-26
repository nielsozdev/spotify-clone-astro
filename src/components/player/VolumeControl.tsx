import { useRef } from 'react'

import { Slider } from '@components/ui/atoms/Slider'
import { VolumeAverageIcon } from '@icons/VolumeAverageIcon'
import { VolumeHighIcon } from '@icons/VolumeHighIcon'
import { VolumeLowIcon } from '@icons/VolumeLowIcon'
import { VolumeOffIcon } from '@icons/VolumeOffIcon'
import { usePlayerStore } from '@store/player.store'

export function VolumeControl ({ disabled = false }: { disabled?: boolean }) {
  const { volume, setVolume } = usePlayerStore((state) => state)
  const previousVolumeRef = useRef(volume)

  const isVolumeMuted = volume < 0.1
  const handleSilenceClick = () => {
    if (isVolumeMuted) {
      setVolume(previousVolumeRef.current)
    } else {
      previousVolumeRef.current = volume
      setVolume(0)
    }
  }

  return (
    <div className={'flex justify-end grow items-center gap-2'}>
      <button
        className="size-5 opacity-80 hover:opacity-100 transition"
        disabled={disabled}
        onClick={handleSilenceClick}
      >
        {volume < 0.1 && <VolumeOffIcon />}
        {volume >= 0.1 && volume < 0.5 && <VolumeLowIcon />}
        {volume >= 0.5 && volume < 0.8 && <VolumeAverageIcon />}
        {volume >= 0.8 && <VolumeHighIcon /> }
      </button>

      <Slider
        className='w-[95px] cursor-pointer py-3'
        defaultValue={[100]}
        disabled={disabled}
        max={100}
        min={0}
        value={[volume * 100]}
        onValueChange={(value) => {
          const [newVolume] = value
          const volumeValue = newVolume / 100
          setVolume(volumeValue)
        }}
      />
    </div>

  )
}
