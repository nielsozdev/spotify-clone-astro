import { getAlbumById } from '@services/albums.services'
import { getArtistById } from '@services/artists.services'
import { getPlaylistById } from '@services/playlists.services'
import { getSingleById } from '@services/singles.services'
import { usePlayerStore } from '@store/player.store'
import type { Album, Artist, MusicSource, Playlist, Single, Song } from '@typesDef/api'

interface DataFetcher {
  album: () => Promise<Album>
  artist: () => Promise<Artist>
  playlist: () => Promise<Playlist>
  single: () => Promise<Single>
}
interface UseButtonPlayer {
  id: string
  type: MusicSource
}

export function useButtonPlayer (params: UseButtonPlayer) {
  const { id, type } = params

  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const currentSong = usePlayerStore((state) => state.currentSong)
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying)
  const setCurrentSong = usePlayerStore((state) => state.setCurrentSong)

  const { idMusicPlayer } = currentSong
  const isPlayingPlayList = isPlaying && (idMusicPlayer === id)

  const shouldStartPlayingPlaylist = Boolean(idMusicPlayer && (idMusicPlayer === id))

  const handlePlaySong = async () => {
    const { songs, song, cover } = await getSongsAndCover(id, type)
    if (isPlayingPlayList) {
      setIsPlaying(false)
      return
    }

    if (shouldStartPlayingPlaylist) {
      setIsPlaying(true)
      return
    }

    if (songs.length > 0) {
      setIsPlaying(true)
    } else {
      console.error('No hay canciones disponibles para reproducir.')
    }

    setCurrentSong({ idMusicPlayer: id, type, cover, song, songs })
  }

  return {
    currentSong,
    isPlaying,
    isPlayingPlayList,
    handlePlaySong
  }
}

async function getSongsAndCover (id: string, type: UseButtonPlayer['type']) {
  const dataFetchers: DataFetcher = {
    album: async () => await getAlbumById(id),
    playlist: async () => await getPlaylistById(id),
    single: async () => await getSingleById(id),
    artist: async () => await getArtistById(id)
    // Agrega más tipos según sea necesario
  }

  const fetchDataFunction = dataFetchers[type as keyof DataFetcher]

  let songs: Song[] = []
  let song: Song | null = null
  let cover: string | null = null
  if (fetchDataFunction) {
    const data = await fetchDataFunction()
    songs = data?.songs ?? []
    song = songs[0] ?? null
    cover = data?.cover ?? null
  }

  return { songs, song, cover }
}
