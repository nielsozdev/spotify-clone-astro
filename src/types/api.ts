export type MusicSource = |
Playlist['type'] |
Album['type'] |
Single['type'] |
Artist['type'] |
'local-music'

export interface Song {
  album: string
  artist: string
  cover?: string | null
  id: string
  idAlbum: string
  idArtist: string
  metadata: Metadata
  title: string
  type: MusicSource
  url: string
}

export interface Playlist {
  album: string
  artist: string
  banner: string | null
  color: string | null
  cover?: string | null
  duration: number
  id: string
  idAlbum?: string | null
  idSingle?: string | null
  songs: Song[]
  title: string
  tracksCount: number
  type: 'playlist'
  url: string
}

export interface Album {
  artist: string
  banner?: string | null
  color: string | null
  cover?: string | null
  duration: number
  id: string
  idArtist: string
  songs: Song[]
  title: string
  tracksCount: number
  type: 'album'
  url: string
}

export interface Single {

  artist: string
  banner?: string | null
  color: string | null
  cover?: string | null
  duration: number
  id: string
  idArtist: string
  songs: Song[]
  title: string
  tracksCount: number
  type: 'single'
  url: string
}

export type OnlySongs = Song

export interface Metadata {
  album?: string | null
  artist?: string | null
  artists?: string[] | null
  composers?: string[] | null
  duration?: number | null
  name?: null | string
  pistas?: number | null
  size?: number | null
  title?: string | null
  year?: number | null
}

export interface Discography {
  albums: Album[]
  artist: Artist
  singles: Song[]
}

export interface Date {
  day: number
  month: number
  year: number
}

export interface Artist {
  banner?: string | null
  cover?: string | null
  id: string
  name: string
  songs?: Song[]
  type: 'artist'
  url: string
}
