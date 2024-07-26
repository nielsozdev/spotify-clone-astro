import fs from 'fs'
import path from 'path'

import { processSongsDirectory } from '@scripts/mock-songs-generator/processSongDirectory'
import type { Album, Song } from '@typesDef/api'
import { capitalizeName } from '@utils/capitalizeName'
import { extractColorsFromImage } from '@utils/extractColorsFromImage'

import { getCoverAndBannerImageFromDirectory } from '@/helpers/getCoverAndBannerImageFromDirectory'
import { getUrlFromDirectory } from '@/helpers/getUrlFromDirectory'

interface Params {
  albums: Album[]
  artistName: string
  artistPath: string
  idArtist: string
  songsArtist: Song[]

}
export async function generateAlbums (params: Params): Promise<void> {
  const { artistPath, artistName, idArtist, albums, songsArtist } = params

  const albumsPath = path.join(artistPath, 'albums')

  if (!fs.existsSync(albumsPath)) return

  const albumDirectories = fs.readdirSync(albumsPath, { withFileTypes: true })
  for (const [index, albumDirectory] of albumDirectories.entries()) {
    const idAlbum = `${idArtist}_${index}`

    const albumPath = path.join(albumsPath, albumDirectory.name)

    if (albumDirectory.isDirectory()) {
      const [coverAlbum, bannerAlbum] = await getCoverAndBannerImageFromDirectory(albumPath)

      const { songs, albumDuration } = await processSongsDirectory({
        directory: albumPath,
        idAlbum,
        idArtist,
        artist: artistName,
        type: 'album'
      })

      let color = null

      if (coverAlbum) {
        const pathImg: string = coverAlbum
        color = await extractColorsFromImage(pathImg)
      }

      songsArtist.push(...songs)

      if (songs.length > 0) {
        albums.push({
          id: idAlbum,
          idArtist,
          artist: artistName,
          title: capitalizeName(albumDirectory.name),
          cover: coverAlbum ?? null,
          banner: bannerAlbum ?? null,
          color: color ?? null,
          url: getUrlFromDirectory(albumPath),
          duration: albumDuration,
          songs,
          tracksCount: songs.length,
          type: 'album'
        })
      }
    }
  }
}
