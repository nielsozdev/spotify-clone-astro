import { response } from '@helpers/response'
import allAlbums from '@mock/api/albums.json'
import type { Album } from '@typesDef/api'
import { validateLimit } from '@utils/validateLimit'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ request }): Promise<Response> => {
  try {
    const url = new URL(request.url)

    const id = url.searchParams.get('id') ?? null
    const limit = url.searchParams.get('limit') ?? undefined
    if (id) {
      const album = await getAlbumById(id)
      if (!album) return response({ error: 'Album not found' })

      return response<Album>({ data: album })
    }

    const albums = await getAllAlbums({ limit })

    if (!albums) return response({ error: 'Albums not found' })

    return response<Album[]>({ data: albums })
  } catch (error) {
    console.error('Error:', error)

    return await Promise.reject(new Error('Internal server error'))
  }
}

async function getAlbumById (id: string): Promise<Album | null> {
  const album = allAlbums.find((album) => album.id === id) ?? null

  return await Promise.resolve(album as Album | null)
}

async function getAllAlbums ({ limit }: { limit?: unknown | undefined }): Promise<Album[] | null> {
  const isValidLimit = validateLimit(limit)

  if (!isValidLimit) return null

  const albums = limit !== undefined ? allAlbums.slice(0, Number(limit)) : allAlbums.slice(0)

  return await Promise.resolve(albums as Album[])
}
