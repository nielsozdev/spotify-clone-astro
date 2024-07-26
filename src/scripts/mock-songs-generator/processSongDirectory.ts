import fs from 'fs'
import path from 'path'

import { isAudioFile } from '@helpers/isAudioFile'
import { processMetadata } from '@helpers/processMetadata'
import type { MusicSource, Song } from '@typesDef/api'

import { getUrlFromDirectory } from '@/helpers/getUrlFromDirectory'

interface ProcessSongsDirectoryProps {
  artist: string
  directory: string
  idAlbum: string
  idArtist: string
  type: MusicSource

}
export async function processSongsDirectory (props: ProcessSongsDirectoryProps): Promise<{ albumDuration: number; songs: Song[] }> {
  const { directory, idAlbum, idArtist, artist, type } = props
  const songsDirectory = fs.readdirSync(directory, { withFileTypes: true })

  const songs: Song[] = []
  let albumDuration = 0

  for (const [index, songDirectory] of songsDirectory.entries()) {
    const audioPath = path.join(directory, songDirectory.name)

    if (isAudioFile(audioPath)) {
      const idSong = `${idAlbum}_${index}`

      const trackUrl = getUrlFromDirectory(audioPath).toString()
      const metadata = await processMetadata(audioPath)
      albumDuration += metadata?.duration ?? 0

      songs.push({
        id: idSong,
        idAlbum,
        idArtist,
        type,
        title: songDirectory.name.replace('.mp3', ''),
        album: path.basename(directory),
        artist,
        cover: null,
        url: trackUrl,
        metadata
      })
    }
  }

  return { songs, albumDuration }
}
