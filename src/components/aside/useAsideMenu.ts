import { useCallback, useEffect, useRef, useState } from 'react'

import { useButtonPlayer } from '@components/button-player/useButtonPlayer'
import { navigate } from 'astro:transitions/client'

interface UseAsideMenu {
  id: string
}
export function useAsideMenu ({ id }: UseAsideMenu) {
  const { handlePlaySong, isPlayingPlayList, currentSong } = useButtonPlayer({ id, type: 'playlist' })

  const [isOpen, setIsOpen] = useState(false)
  const menuRef: any = useRef(null)

  const currentActiveLink = currentSong.idMusicPlayer === id
  const activeLink = currentActiveLink ? 'text-green-400' : ''
  const activeLinkText = currentActiveLink ? 'text-white' : 'text-gray-400'
  const timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef?.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  let clicks = 0
  const handleClick = useCallback(() => {
    clicks++
    if (clicks === 1) {
      timer.current = setTimeout(() => {
        navigate(`/playlist/${id}`)
      }, 150)
    } else {
      clearTimeout(timer?.current ?? 0)
      handlePlaySong()
      clicks = 0
    }
  }, [])

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsOpen(true)
  }

  return {
    activeLink,
    activeLinkText,
    handleClick,
    handleContextMenu,
    isOpen,
    menuRef,
    isPlayingPlayList
  }
}
