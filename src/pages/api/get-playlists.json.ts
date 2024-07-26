import { response } from '@helpers/response'
import newPlaylists from '@mock/api/playlists/playlists.json'
import playlists from '@mock/api/playlists.json'
import type { Playlist } from '@typesDef/api'
import { validateLimit } from '@utils/validateLimit'
import type { APIRoute } from 'astro'

const allPlaylists = [...playlists, ...newPlaylists]
export const GET: APIRoute = async ({ request }): Promise<Response> => {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id') ?? null
    const type = url.searchParams.get('type') as Playlist['type'] ?? null
    const limit = url.searchParams.get('limit') ?? undefined

    if (id) {
      const playlist = await getPlaylistById(id)

      if (!playlist) return response({ error: 'Playlist not found' })

      return response<Playlist>({ data: playlist })
    }

    const playlists = await getAllPlaylistsByType({ limit, type })

    if (!playlists) return response({ error: 'Playlists not found' })

    return response<Playlist[]>({ data: playlists })
  } catch (error) {
    return await Promise.reject(new Error('Internal server error'))
  }
}

async function getPlaylistById (id: string): Promise<Playlist | null> {
  const playlist = allPlaylists.find((playlist) => playlist.id === id) ?? null

  return await Promise.resolve(playlist as Playlist | null)
}

interface GetAllPlaylistsByType {
  limit: unknown | undefined
  type: Playlist['type'] | null

}

async function getAllPlaylistsByType ({ type = null, limit }: GetAllPlaylistsByType): Promise<Playlist[] | null> {
  const isValidLimit = validateLimit(limit)
  if (!isValidLimit) return null

  let filteredPlaylists = allPlaylists

  if (type !== null) {
    filteredPlaylists = filteredPlaylists.filter((playlist) => playlist.type === type)
  }

  if (limit !== undefined) {
    filteredPlaylists = filteredPlaylists.slice(0, Number(limit))
  }

  return await Promise.resolve(filteredPlaylists as Playlist[])
}
