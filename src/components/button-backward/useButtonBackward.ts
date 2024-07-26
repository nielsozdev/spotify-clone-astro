import { usePlayerStore } from '@store/player.store'
import { useShallow } from 'zustand/react/shallow'

export function useButtonBackward ({ id }: { id: string }) {
  const { currentSong, setIsPlaying, setCurrentSong } = usePlayerStore(useShallow((state) => state))
  const handlePlayPrevSong = () => {
    const { songs } = currentSong

    const index = songs.findIndex((song) => {
      return song.id === id
    })
    const prevSong = songs[index - 1]

    if (prevSong) {
      setIsPlaying(true)
      setCurrentSong({ ...currentSong, song: prevSong })
    }
  }

  return {
    handlePlayPrevSong,
    disabledButton: !(currentSong.songs.findIndex((song) => song.id !== id) === 0)
  }
}
