import { config } from '@config/index'
import { getDataFromApi } from '@helpers/getDataFromApi'
import type { Artist } from '@typesDef/api'

const URL_GET_ARTISTS = `${config.BASE_URL}/api/get-artists.json`

export async function getAllArtists ({
  limit = 10
}: { limit?: number } = {}): Promise<Artist[]> {
  try {
    const url = `${URL_GET_ARTISTS}?limit=${limit}`
    const artists = await getDataFromApi(url)
    return artists
  } catch (error) {
    console.error('Error fetching artists', error)
    throw new Error('Error fetching artists')
  }
}

export async function getArtistById (id: Artist['id']): Promise<Artist> {
  try {
    const url = `${URL_GET_ARTISTS}?id=${id}`
    const artist = (await getDataFromApi(url)) as Artist

    return artist
  } catch (error) {
    console.error('Error fetching artist', error)
    throw new Error('Error fetching artist')
  }
}
