import { getAlbumById } from '@services/albums.services'
import { getArtistById } from '@services/artists.services'
import { getPlaylistById } from '@services/playlists.services'
import { getSingleById } from '@services/singles.services'
import { usePlayerStore } from '@store/player.store'
import type { MusicSource, Song, Album, Playlist, Single, Artist } from '@typesDef/api'
import { useShallow } from 'zustand/react/shallow'

interface DataFetcher {
  album: () => Promise<Album>
  artist: () => Promise<Artist>
  playlist: () => Promise<Playlist>
  single: () => Promise<Single>
}
interface UseButtonPlayer {
  id: string
  song: Song
  type: MusicSource
}

export function useButtonPlayerSong ({ id: currentId, song: actualSong, type }: UseButtonPlayer) {
  const { isPlaying, currentSong, setIsPlaying, setCurrentSong } = usePlayerStore(useShallow((state) => state))

  const { idMusicPlayer, song } = currentSong

  const isPlayingSong = isPlaying && song?.id === actualSong.id
  const shouldStartPlayingPlaylist = !!idMusicPlayer && idMusicPlayer === currentId && song?.id === actualSong.id

  const handlePlaySong = async () => {
    if (isPlayingSong) {
      setIsPlaying(false)
      return
    }

    if (shouldStartPlayingPlaylist) {
      setIsPlaying(true)
      return
    }

    const { cover, songs } = await getSongsAndCover(currentId, type)

    if (actualSong) { //
      setIsPlaying(true)
      setCurrentSong({ cover, idMusicPlayer: currentId, song: actualSong, songs, type })
    } else {
      console.error('No hay canciones disponibles para reproducir.')
    }
  }

  return {
    currentSong,
    isPlaying,
    isPlayingSong,
    setCurrentSong,
    handlePlaySong
  }
}

async function getSongsAndCover (id: string, type: UseButtonPlayer['type']) {
  let songs: Song[] = []
  let song: Song | null = null
  let cover: string | null = null

  const dataFetchers: DataFetcher = {
    album: async () => await getAlbumById(id),
    playlist: async () => await getPlaylistById(id),
    single: async () => await getSingleById(id),
    artist: async () => await getArtistById(id)
  }

  const fetchDataFunction = dataFetchers[type as keyof DataFetcher]

  if (fetchDataFunction) {
    const data = await fetchDataFunction()

    songs = data?.songs ?? []
    song = songs[0] ?? null
    cover = data?.cover ?? null
  }

  return { songs, song, cover }
}
