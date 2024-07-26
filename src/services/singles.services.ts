import { config } from '@config/index'
import { getDataFromApi } from '@helpers/getDataFromApi'
import type { Single } from '@typesDef/api'

const URL_GET_SINGLES = `${config.BASE_URL}/api/get-singles.json`

export async function getAllSingles ({
  limit = null
}: { limit?: number | null } = {}): Promise<Single[]> {
  try {
    const url = limit ? `${URL_GET_SINGLES}?limit=${limit}` : URL_GET_SINGLES

    const singles = (await getDataFromApi(url)) as Single[]
    return singles
  } catch (error) {
    console.error('Error fetching singles', error)
    throw new Error('Error fetching single')
  }
}

export async function getSingleById (id: Single['id']): Promise<Single> {
  try {
    const url = `${URL_GET_SINGLES}?id=${id}`

    const single = (await getDataFromApi(url)) as Single

    return single
  } catch (error) {
    console.error('Error fetching single by id', error)
    throw new Error('Error fetching single by id')
  }
}
