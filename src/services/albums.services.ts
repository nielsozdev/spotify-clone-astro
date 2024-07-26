import { config } from '@config/index'
import { getDataFromApi } from '@helpers/getDataFromApi'
import type { Album } from '@typesDef/api'

const URL_GET_ALBUMS = `${config.BASE_URL}/api/get-albums.json`
console.log({ URL_GET_ALBUMS, config })
export async function getAllAlbums ({
  limit = null
}: { limit?: number | null } = {}): Promise<Album[]> {
  try {
    const url = limit ? `${URL_GET_ALBUMS}?limit=${limit}` : URL_GET_ALBUMS

    const albums = (await getDataFromApi(url)) as Album[]

    return albums
  } catch (error) {
    console.error('Error fetching albums', error)
    throw new Error('Error fetching album')
  }
}

export async function getAlbumById (id: Album['id']): Promise<Album> {
  try {
    const url = `${URL_GET_ALBUMS}?id=${id}`
    const album = (await getDataFromApi(url)) as Album

    return album
  } catch (error) {
    console.error('Error fetching album by id', error)
    throw new Error('Error fetching album by id')
  }
}
