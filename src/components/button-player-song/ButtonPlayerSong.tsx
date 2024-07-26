import { useEffect, useState } from 'react'

import { ButtonPlay } from '@components/ui/atoms/ButtonPlay'
import { PlaySongIcon } from '@icons/PlaySongIcon'
import type { Song, MusicSource } from '@typesDef/api'

import { useButtonPlayerSong } from './useButtonPlayerSong'

interface Props {
  id: string
  size?: 'small' | 'normal' | 'big'
  song: Song
  type: MusicSource
}

export function ButtonPlayerSong ({ song, id, type, size = 'small' }: Props) {
  const { isPlayingSong, handlePlaySong, currentSong } = useButtonPlayerSong({
    id,
    song,
    type
  })
  const [showEquilizer, setShowEquilizer] = useState(false)

  useEffect(() => {
    if (isPlayingSong) {
      setShowEquilizer(true)
    } else {
      setShowEquilizer(false)
    }
  }, [isPlayingSong])

  const showButton =
    currentSong?.song?.id === song.id && !isPlayingSong && !showEquilizer
  const showButtonIsPlaying =
    isPlayingSong || showButton
      ? 'group-hover:opacity-100'
      : 'opacity-0 group-hover:opacity-100'

  const handleOnMouseOver = () => {
    if (isPlayingSong) {
      setShowEquilizer(false)
    }
  }

  const handleOnMouseOut = () => {
    if (isPlayingSong) {
      setShowEquilizer(true)
    }
  }

  return (
    <>
      <div
        className={`justify-center' absolute top-0 z-20 flex h-full w-full items-center ${showButtonIsPlaying}`}
      >
        <div className='relative flex h-full w-full items-center justify-center '>
          <div
            className='absolute z-20 bg-zinc-900 group-hover:bg-transparent'
            onMouseOut={handleOnMouseOut}
            onMouseOver={handleOnMouseOver}
          >
            {!showEquilizer && (
              <ButtonPlay
                bgColor='transparent'
                iconPlay={PlaySongIcon}
                iconType={isPlayingSong ? 'pause' : 'play'}
                size={size}
                onClick={handlePlaySong}
              />
            )}
            {showEquilizer && (
              <img
                alt='equializerImage'
                className='bg-zinc-900  transition-all duration-300'
                src='/images/player-controls/equaliser.gif'
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
