import crypto from 'crypto'

import newPlaylists from '@mock/api/playlists/playlists.json'
import allPlaylists from '@mock/api/playlists.json'
import { writeJsonFile } from '@utils/writeJSONFIle'
import type { APIRoute } from 'astro'

// eslint-disable-next-line @typescript-eslint/require-await
export const POST: APIRoute = async (): Promise<Response> => {
  const numOfPlaylists = allPlaylists.length + newPlaylists.length
  const id = crypto.randomUUID().toString()

  const newPlaylist = {
    id,
    title: `Mi playlist n.° ${numOfPlaylists + 1}`,
    type: 'playlist',
    cover: null,
    songs: [],
    duration: 0,
    artist: '',
    color: null
  }
  const path = './src/__mock/api/playlists/playlists.json'
  const prevPlaylists = [...newPlaylists, newPlaylist]

  writeJsonFile(path, prevPlaylists)
  return new Response(
    JSON.stringify({
      message: 'ok',
      data: newPlaylist
    }),
    { status: 200 }
  )
}
