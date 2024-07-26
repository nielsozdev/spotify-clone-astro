import fs from 'node:fs'
import path from 'node:path'

import { writeApiData } from '@helpers/writeApiData'
import type { Album, Artist, Single } from '@typesDef/api'
import { capitalizeName } from '@utils/capitalizeName'

import { generateAlbums } from './generateAlbums'
import { generatePlaylist } from './generatePlaylist'
import { generateSingles } from './generateSingles'
import { generateSongs } from './generateSongs'

import { getCoverAndBannerImageFromDirectory } from '@/helpers/getCoverAndBannerImageFromDirectory'
import { getUrlFromDirectory } from '@/helpers/getUrlFromDirectory'

async function getMusicMockFromPath (pathname: string) {
  try {
    const albums = await getMusicMock(pathname)
    // console.log(albums)
    return albums
  } catch (error) {
    console.error('Error al generar datos:', error)
  }
}

getMusicMockFromPath('./public/music/artists')

export async function getMusicMock (
  pathname: string,
  currentId: string = '0'
): Promise<string> {
  try {
    const artists: Artist[] = []
    const albums: Album[] = []
    const singles: Single[] = []

    const artistRootDirectories = fs.readdirSync(pathname, {
      withFileTypes: true
    })

    for (const [index, artistDirectory] of artistRootDirectories.entries()) {
      if (artistDirectory.isDirectory()) {
        const idArtist = `${currentId}_${index}`

        const artistPath = path.join(pathname, artistDirectory.name)

        let coverArtist = null
        let bannerArtist = null

        if (artistDirectory.isDirectory()) {
          const images = await getCoverAndBannerImageFromDirectory(artistPath)

          coverArtist = images[0] ?? `https://i.pravatar.cc/300?img=${index}`
          bannerArtist = images[1]
        }

        artists.push({
          id: idArtist,
          name: capitalizeName(artistDirectory.name),
          url: getUrlFromDirectory(artistPath),
          cover: coverArtist,
          banner: bannerArtist,
          type: 'artist',
          songs: []
        })

        await generateAlbums({
          artistPath,
          artistName: artistDirectory.name,
          idArtist,
          albums,
          songsArtist: artists[index].songs ?? []
        })
        await generateSingles({
          artistPath,
          artistName: artistDirectory.name,
          idArtist,
          singles,
          songsArtist: artists[index].songs ?? []
        })
      }
    }

    const songs = generateSongs({ albums, singles })
    const playlists = generatePlaylist({ albums, singles })

    writeApiData({
      artists,
      albums,
      singles,
      playlists,
      songs
    })

    return 'Realizado con éxito'
  } catch (error) {
    throw new Error('Error al generar datos')
  }
}
