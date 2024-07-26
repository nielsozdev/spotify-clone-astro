import { getMusicMock } from '@scripts/mock-songs-generator/index'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async (): Promise<Response> => {
  const albums = await getMusicMock('./public/music/artists')

  return new Response(JSON.stringify({
    message: 'ok',
    albums
  }), {
    headers: { 'content-type': 'application/json' },
    status: 200

  })
}
