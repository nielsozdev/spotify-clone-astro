import fs from 'fs'
import path from 'path'

import type { Single, Song } from '@typesDef/api'
import { extractColorsFromImage } from '@utils/extractColorsFromImage'

import { processSongsDirectory } from './processSongDirectory'

import { getCoverAndBannerImageFromDirectory } from '@/helpers/getCoverAndBannerImageFromDirectory'
import { getUrlFromDirectory } from '@/helpers/getUrlFromDirectory'

interface Params {
  artistName: string
  artistPath: string
  idArtist: string
  singles: Single[]
  songsArtist: Song[]

}
export async function generateSingles (params: Params): Promise<void> {
  const { artistPath, artistName, idArtist, singles, songsArtist } = params

  const albumsPath = path.join(artistPath, '')

  if (!fs.existsSync(albumsPath)) return

  const albumDirectories = fs.readdirSync(albumsPath, { withFileTypes: true })

  for (const [index, albumDirectory] of albumDirectories.entries()) {
    const idAlbum = `${idArtist}_${index}`

    const albumPath = path.join(albumsPath, albumDirectory.name)

    if (albumDirectory.name === 'singles') {
      let coverAlbum = null
      let bannerAlbum = null

      if (albumDirectory.isDirectory()) {
        [coverAlbum, bannerAlbum] = await getCoverAndBannerImageFromDirectory(albumPath)
      }

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

      singles.push({
        id: idAlbum,
        idArtist,
        artist: artistName,
        title: albumDirectory.name,
        cover: coverAlbum ?? null,
        color,
        banner: bannerAlbum ?? null,
        url: getUrlFromDirectory(albumPath),
        duration: albumDuration,
        songs,
        tracksCount: songs.length,
        type: 'single'
      })
    }
  }
}
