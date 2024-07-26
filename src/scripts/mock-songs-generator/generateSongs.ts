import type { Album, OnlySongs, Single } from '@typesDef/api'

export function generateSongs ({ albums, singles }: { albums: Album[]; singles: Single[] }): OnlySongs[] {
  const songs: OnlySongs[] = []

  for (const album of albums) {
    for (const song of album.songs) {
      songs.push(song)
    }
  }

  for (const single of singles) {
    for (const song of single.songs) {
      songs.push(song)
    }
  }

  return songs
}
