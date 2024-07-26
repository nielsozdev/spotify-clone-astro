import allSongs from '@mock/api/songs.json'
import { type MusicSource, type Song } from '@typesDef/api'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ request }): Promise<Response> => {
  const { url } = request

  const idSong = new URL(url).searchParams.get('id-song')?.toString() ?? null
  const idAlbum = new URL(url).searchParams.get('id-album')?.toString() ?? null
  const type = new URL(url).searchParams.get('type')?.toString() as MusicSource ?? null

  if (idSong) {
    const song = await getSongById({ id: idSong })
    return responseSongs(song)
  }

  if (idAlbum) {
    const songs = await getAllSongsFromAlbum(idAlbum)
    return responseSongs(songs)
  }

  if (type) {
    const songs = await getAllSongsByType(type)
    return responseSongs(songs)
  }

  const songs = await getAllSongs()
  return responseSongs(songs)
}

async function getAllSongs (): Promise<Song[]> {
  return await new Promise((resolve) => {
    const songs = allSongs as Song[]
    resolve(songs)
  })
}

async function getSongById ({ id }: { id: Song['id'] }): Promise<Song> {
  const song = await filterSongs('idSong', id)
  return song[0]
}

async function getAllSongsByType (type: MusicSource): Promise<Song[]> {
  return await filterSongs('type', type)
}

async function getAllSongsFromAlbum (idAlbum: Song['idAlbum']): Promise<Song[]> {
  return await filterSongs('idAlbum', idAlbum)
}

async function filterSongs (criteria: string, value: any): Promise<Song[]> {
  return await new Promise((resolve, reject) => {
    getAllSongs().then((songs) => {
      const filteredSongs = songs.filter((song) => song[criteria as keyof Song] === value)
      resolve(filteredSongs)
    }).catch((error) => {
      reject(error)
    })
  })
}

function responseSongs (songs: Song[] | Song): Response {
  return new Response(JSON.stringify({ data: songs }), {
    headers: { 'content-type': 'application/json' }
  })
}
