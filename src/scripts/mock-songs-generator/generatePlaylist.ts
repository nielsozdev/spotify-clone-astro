import type { Album, Playlist, Single } from '@typesDef/api'

export function generatePlaylist ({ albums, singles }: { albums: Album[]; singles: Single[] }): Playlist[] {
  const albumsPlaylist: Playlist[] = albums.slice(0, 5).map((album, index) => {
    return {
      album: album.title,
      artist: album.artist,
      banner: album.banner ?? null,
      color: album.color,
      cover: album.cover ?? null,
      duration: album.duration,
      id: index.toString(),
      idAlbum: album.id,
      idSingle: null,
      songs: album.songs,
      title: album.title,
      type: 'playlist',
      url: album.url,
      tracksCount: album.songs.length
    }
  })

  const singlesPlaylist: Playlist[] = singles.slice(0, 5).map((single, index) => {
    const idPlaylist = (albums.length + (index + 1)).toString()
    return {
      album: single.title,
      artist: single.artist,
      banner: single.banner ?? null,
      color: single.color,
      cover: single.cover ?? null,
      duration: single.duration,
      id: idPlaylist,
      idAlbum: null,
      idSingle: single.id,
      songs: single.songs,
      title: single.title,
      type: 'playlist',
      url: single.url,
      tracksCount: single.songs.length
    }
  })
  const playlists: Playlist[] = [...albumsPlaylist, ...singlesPlaylist]
  return playlists
}
