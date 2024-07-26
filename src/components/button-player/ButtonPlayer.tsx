import { useState } from 'react'

import { ButtonPlay } from '@components/ui/atoms/ButtonPlay'
import type { MusicSource } from '@typesDef/api'
import { type ButtonSizes } from '@typesDef/types'

import { useButtonPlayer } from './useButtonPlayer'

interface Props {
  disabled?: boolean
  id: string
  path?: string
  size?: ButtonSizes
  type: MusicSource
  typeButton?: 'landscape' | 'square'
}

export function ButtonPlayer (props: Props) {
  const { id, type, disabled = false, size = 'normal', path = '/', typeButton = 'square' } = props

  const [showEquilizer, setShowEquilizer] = useState(true)
  const { handlePlaySong, isPlayingPlayList } = useButtonPlayer({ id, type })

  let showButtonIsPlaying = ''

  const isInternalPath = path !== '/'

  if (isInternalPath) {
    showButtonIsPlaying = ''
  } else {
    showButtonIsPlaying = (isPlayingPlayList)
      ? 'delay-300 '
      : 'pointer-events-auto z-10 inline-flex cursor-pointer items-center justify-center rounded-full h-full opacity-0 group-hover:translate-y-[-0px]  group-hover:opacity-100  transition duration-300 translate-y-[2.5rem]'
  }

  const showEqualizerComponent = typeButton === 'landscape' && showEquilizer && isPlayingPlayList
  const handleOnMouseOver = () => {
    if (isPlayingPlayList) {
      setShowEquilizer(false)
    }
  }

  const handleOnMouseOut = () => {
    if (isPlayingPlayList) {
      setShowEquilizer(true)
    }
  }

  return (
    <div className="w-full cursor-pointer pr-0.5 pb-0.5 pl-1 pt-1">

      <div
        className={showEqualizerComponent ? 'flex items-center' : ''}
        onMouseOut={handleOnMouseOut}
        onMouseOver={handleOnMouseOver}
      >
        <div
          className={showButtonIsPlaying }
        >
          { !showEqualizerComponent && (
            <ButtonPlay
              bgColor='green'
              disabled={disabled}
              iconType={isPlayingPlayList ? 'pause' : 'play'}
              size={size}
              onClick={handlePlaySong}
            />
          )}

        </div>
        <div className='flex items-center  h-full transition-all duration-300'>
          {showEqualizerComponent && (
            <div className='flex h-full'>
              <picture>
                <img alt="equializerImage" className='bg-zinc-900 transition-all duration-300 h-6' src="/images/player-controls/equaliser.gif" />
              </picture>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
