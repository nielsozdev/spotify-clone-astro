import type { Song } from '@typesDef/api'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface CurrentSong {
  cover: string | null
  idMusicPlayer: string | null
  song: Song | null
  songs: Song[]
  type: string | null
}

interface PlayerStore {
  currentSong: CurrentSong
  isPlaying: boolean
  setCurrentSong: (currentSong: CurrentSong) => void
  setIsPlaying: (isPlaying: boolean) => void
  setVolume: (volume: number) => void
  volume: number
}

const defaultCurrentSong: CurrentSong = {
  cover: null,
  idMusicPlayer: null,
  song: null,
  type: null,
  songs: []

}
export const usePlayerStore = create<PlayerStore>()(devtools((set) => ({
  volume: 1,
  isPlaying: false,
  currentSong: defaultCurrentSong,
  setVolume: (volume: number) => set({ volume }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setCurrentSong: (currentSong: any) => set({ currentSong })
})))
