import { response } from '@helpers/response'
import allArtists from '@mock/api/artists.json'
import type { Artist } from '@typesDef/api'
import { validateLimit } from '@utils/validateLimit'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ request }): Promise<Response> => {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id') ?? null
    const limit = url.searchParams.get('limit') ?? undefined
    const query = url.searchParams.get('q') ?? null

    if (query) {
      const artists = allArtists.filter((artist) => artist.name.toLowerCase().includes(query.toLowerCase())) as Artist[]
      if (!artists) return response({ error: 'Artists not found' })

      return response<Artist[]>({ data: artists })
    }

    if (id) {
      const artist = await getArtistById(id)
      if (!artist) return response({ error: 'Artist not found' })

      return response<Artist>({ data: artist })
    }

    const artists = await getAllArtists({ limit })

    if (!artists) return response({ error: 'Artists not found' })

    return response<Artist[]>({ data: artists })
  } catch (error) {
    console.error('Error:', error)

    return await Promise.reject(new Error('Internal server error'))
  }
}

async function getArtistById (id: string): Promise<Artist | null> {
  const artist = allArtists.find((artist) => artist.id === id) ?? null

  return await Promise.resolve(artist as Artist | null)
}

async function getAllArtists ({ limit }: { limit?: unknown | undefined }): Promise<Artist[] | null> {
  const isValidLimit = validateLimit(limit)

  if (!isValidLimit) return null

  const artists = limit !== undefined ? allArtists.slice(0, Number(limit)) : allArtists.slice(0)

  return await Promise.resolve(artists as Artist[])
}
