import { getDataFromApi } from '@helpers/getDataFromApi'
import type { MusicSource, Playlist } from '@typesDef/api'

import { config } from '@/config/index'

const URL_GET_PLAYLISTS = `${config.BASE_URL}/api/get-playlists.json`

export async function getAllPlaylists ({
  limit = null
}: { limit?: number | null } = {}): Promise<Playlist[]> {
  try {
    const url = limit
      ? `${URL_GET_PLAYLISTS}?limit=${limit}`
      : URL_GET_PLAYLISTS

    return await getDataFromApi(url)
  } catch (error) {
    console.error('Error fetching playlists', error)
    throw new Error('Error fetching playlist')
  }
}

export async function getPlaylistById (id: Playlist['id']): Promise<Playlist> {
  try {
    const url = `${URL_GET_PLAYLISTS}?id=${id}`

    const playlist = (await getDataFromApi(url)) as Playlist
    return playlist
  } catch (error) {
    console.error('Error fetching playlist', error)
    throw new Error('Error fetching playlist')
  }
}

export async function getPlaylistByType (
  id: Playlist['id'],
  type: MusicSource
): Promise<Playlist[]> {
  try {
    const url = `${URL_GET_PLAYLISTS}?id=${id}&type=${type}`

    return await getDataFromApi(url)
  } catch (error) {
    console.error('Error fetching playlist', error)
    throw new Error('Error fetching playlist')
  }
}

export async function deletePlaylist (id: string) {
  try {
    const res = await fetch(`/api/delete-playlist?id=${id}`, {
      method: 'DELETE'
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error deleting  playlist', error)
    throw new Error('Error deleting  playlist')
  }
}
