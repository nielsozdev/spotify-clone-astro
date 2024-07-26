import newPlaylists from '@mock/api/playlists/playlists.json'
import allPlaylists from '@mock/api/playlists.json'
import type { Playlist } from '@typesDef/api'
import { writeJsonFile } from '@utils/writeJSONFIle'
import type { APIRoute } from 'astro'

// eslint-disable-next-line @typescript-eslint/require-await
export const DELETE: APIRoute = async ({ request }): Promise<Response> => {
  const url = new URL(request.url)

  let dataDeleted = null

  const id = url.searchParams.get('id')
  const existIDinAllPlaylists = allPlaylists.find((i) => i.id === id)

  if (existIDinAllPlaylists) {
    const res = allPlaylists.filter((i) => i.id !== id)
    const path = './src/__mock/api/playlists.json'
    dataDeleted = res

    writeJsonFile(path, res)
  }

  const existIDinNewPlaylists = newPlaylists.find((i: Playlist) => i.id === id)

  if (existIDinNewPlaylists) {
    const data = newPlaylists.filter((i: Playlist) => i.id !== id)
    const path = './src/__mock/api/playlists/playlists.json'

    dataDeleted = data

    writeJsonFile(path, data)
  }

  return new Response(
    JSON.stringify({
      message: 'ok',
      data: dataDeleted
    }),
    { status: 200 }
  )
}
