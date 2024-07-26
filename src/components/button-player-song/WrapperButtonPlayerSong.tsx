import type { MusicSource, Song } from '@typesDef/api'

import { useButtonPlayerSong } from './useButtonPlayerSong'

interface Props {
  children: React.ReactNode
  id: string
  song: Song
  type: MusicSource
}

export function WrapperButtonPlayerSong ({ song, id, type, children }: Props) {
  const { handlePlaySong } = useButtonPlayerSong({ id, song, type })

  return (
    <div className='w-full' onDoubleClick={handlePlaySong}>
      {children}
    </div>
  )
}
