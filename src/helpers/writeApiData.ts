import type { Album, Artist, Playlist, Single, Song } from '@typesDef/api'
import { writeJsonFile } from '@utils/writeJSONFIle'

interface WriteApiData {
  albums: Album[]
  artists: Artist[]
  playlists: Playlist[]
  singles: Single[]
  songs: Song[]

}

export function writeApiData (data: WriteApiData) {
  const { artists, albums, singles, playlists, songs } = data

  const pathToSave = './src/__mock/api'

  writeJsonFile(`${pathToSave}/artists.json`, artists)
  writeJsonFile(`${pathToSave}/albums.json`, albums)
  writeJsonFile(`${pathToSave}/singles.json`, singles)
  writeJsonFile(`${pathToSave}/playlists.json`, playlists)
  writeJsonFile(`${pathToSave}/songs.json`, songs)
}
