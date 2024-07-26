import { config } from '@config/index'
import { getDataFromApi } from '@helpers/getDataFromApi'
import type { Album, MusicSource, Song } from '@typesDef/api'

const URL_GET_SONGS = `${config.BASE_URL}/api/get-songs.json`

export async function getAllSongs (): Promise<Song[]> {
  const url = URL_GET_SONGS

  try {
    const response: Song[] = await getDataFromApi(url)
    return response
  } catch (error) {
    console.error('Error fetching songs', error)
    throw new Error('Error fetching songs')
  }
}

export async function getSongById (idSong: Song['id']): Promise<Song> {
  try {
    const url = `${URL_GET_SONGS}?id-song=${idSong}`

    const response = await getDataFromApi(url) as Song
    return response
  } catch (error) {
    console.error('Error fetching song', error)
    throw new Error('Error fetching songs by id')
  }
}

export async function getAllSongsFromAlbum (idAlbum: Album['id']): Promise<Song[] > {
  try {
    const url = `${URL_GET_SONGS}?id-album=${idAlbum}`

    const response: Song[] = await getDataFromApi(url)
    return response
  } catch (error) {
    console.error('Error fetching songs from album', error)
    throw new Error('Error fetching songs')
  }
}

export async function getAllSongsByType (type: MusicSource): Promise<Song[] > {
  try {
    const url = `${URL_GET_SONGS}?type=${type}`

    const response: Song[] = await getDataFromApi(url)
    return response
  } catch (error) {
    console.error('Error fetching songs by type', error)
    throw new Error('Error fetching songs')
  }
}
