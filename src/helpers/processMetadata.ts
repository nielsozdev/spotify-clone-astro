import type { Metadata } from '@typesDef/api'
import mm from 'music-metadata'

export async function processMetadata (path: string): Promise<Metadata> {
  try {
    const metadata = await mm.parseFile(path)

    const artist = metadata.common.artist ?? null
    const title = metadata.common.title ?? null
    const album = metadata.common.album ?? null
    const year = metadata.common.year ?? null
    const duration = metadata.format.duration ?? 0
    const name = (artist && title) ? `${artist} - ${title}` : null
    const size = metadata.format.bitrate ?? 0
    const composers = metadata.common.composer ?? null
    const artists = metadata.common.artists ?? null
    const pistas = metadata.common.track.no ?? null

    return {
      artist,
      title,
      album,
      year,
      duration,
      name,
      size,
      composers,
      artists,
      pistas
    }
  } catch (error) {
    console.error('Error al obtener metadatos:', (error as Error).message)
    throw new Error('Error al obtener metadatos')
  }
}
