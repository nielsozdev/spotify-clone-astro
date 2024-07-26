import { usePlayerStore } from '@store/player.store'
import { useShallow } from 'zustand/react/shallow'

export function useButtonForward ({ id }: { id: string }) {
  const { currentSong, setIsPlaying, setCurrentSong } = usePlayerStore(useShallow((state) => state))
  const handlePlayNextSong = () => {
    const { songs } = currentSong

    const index = songs.findIndex((song) => song.id === id)

    const prevSong = songs[index + 1]

    if (prevSong) {
      setIsPlaying(true)
      setCurrentSong({ ...currentSong, song: prevSong })
    }
  }

  return {
    handlePlayNextSong,
    disabledButton: currentSong.songs.findIndex((song) => song.id === id) === currentSong.songs.length - 1
  }
}
