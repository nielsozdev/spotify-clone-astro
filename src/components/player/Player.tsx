import { useEffect, useRef, useState } from 'react'

import { ButtonBackwardSong } from '@components/button-backward/ButtonBackward'
import { ButtonForwardSong } from '@components/button-forward/ButtonForward'
import { ButtonPlay } from '@components/ui/atoms/ButtonPlay'
import { config } from '@config/index'
import { usePlayerStore } from '@store/player.store'

import { CurrentSong } from './CurrentSong'
import { SongControl } from './SongControl'
import { useMediaControlsKeyboard } from './useMediaControlsKeyboard'
import { useWindowSize } from './useWindowSize'
import { VolumeControl } from './VolumeControl'

export function Player () {
  const { currentSong, isPlaying, setIsPlaying, volume, setCurrentSong } =
    usePlayerStore((state) => state)
  const [isMobile, setIsMobile] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const { width } = useWindowSize()
  useMediaControlsKeyboard()
  useEffect(() => {
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause()
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    const { song } = currentSong

    if (song && isPlaying && audioRef.current) {
      const src = `${song.url}`
      audioRef.current.src = src
      audioRef.current.volume = volume
      audioRef.current?.play()
    }
  }, [currentSong])

  useEffect(() => {
    if (width && width < config.BREAKPOINTS.md) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [width])
  useEffect(() => {
    const handleEnded = () => {
      const { songs } = currentSong
      const index = songs.findIndex((song) => song.id === currentSong?.song?.id)
      const nextSong = songs[index + 1]

      if (nextSong) {
        setCurrentSong({ ...currentSong, song: nextSong })
        setIsPlaying(true)
      } else {
        setIsPlaying(false)
        const { songs } = currentSong
        const src = `/${songs[0]?.url}`

        audioRef.current?.src && (audioRef.current.src = src)

        setCurrentSong({ ...currentSong, song: songs[0] })
      }
    }

    const currentAudioRef = audioRef.current

    if (currentAudioRef) currentAudioRef.addEventListener('ended', handleEnded)

    return () => {
      if (currentAudioRef) {
        currentAudioRef.removeEventListener('ended', handleEnded)
      }
    }
  }, [currentSong])

  const handleClick = () => {
    setIsPlaying(!isPlaying)
  }

  if (!width) {
    return (
      <div className={'relative flex w-full '}>
        {isMobile && (
          <div className='absolute left-2 right-2 top-0'>
            <SongControl
              isMobile
              audio={audioRef}
              disabled={!currentSong.song}
            />
          </div>
        )}
        <div className={'flex w-full items-center justify-between '} />
      </div>
    )
  }

  return (
    <div className={'relative flex h-full w-full  px-3'}>
      {isMobile && (
        <div className='absolute left-1 right-1 top-[0px]'>
          <SongControl isMobile audio={audioRef} disabled={!currentSong.song} />
        </div>
      )}
      <div className={'flex h-full w-full items-center justify-between  '}>
        <CurrentSong
          album={currentSong.song?.album ?? ''}
          artist={currentSong.song?.artist ?? ''}
          artistId={currentSong.song?.idArtist ?? ''}
          cover={currentSong.cover ?? ''}
          disabled={!currentSong.song}
          title={currentSong.song?.title ?? ''}
        />
        <div
          className={`h-full max-w-[722px]  ${isMobile ? 'flex items-center' : 'w-[40%]'}`}
        >
          <div className='flex flex-col items-center'>
            <div
              className={`flex items-center gap-1 sm:gap-2 md:gap-4 ${isMobile ? 'justify-start' : 'justify-center'}`}
            >
              <ButtonBackwardSong
                bgColor='white'
                id={currentSong.song?.id ?? ''}
                size='normal'
              />
              <div className='flex'>
                <ButtonPlay
                  bgColor='white'
                  disabled={!currentSong.song}
                  iconType={isPlaying ? 'pause' : 'play'}
                  size='normal'
                  onClick={handleClick}
                />
                <audio ref={audioRef} />
              </div>

              <ButtonForwardSong
                bgColor='white'
                id={currentSong.song?.id ?? ''}
                size='normal'
              />
            </div>
            {!isMobile && (
              <SongControl audio={audioRef} disabled={!currentSong.song} />
            )}
          </div>
        </div>
        {!isMobile && (
          <div className='flex h-full w-[30%] min-w-[180px] flex-row justify-end'>
            <VolumeControl disabled={!currentSong.song} />
          </div>
        )}
      </div>
    </div>
  )
}
