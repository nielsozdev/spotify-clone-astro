import { AlbumIcon } from '@icons/AlbumIcon.tsx'
import { AudioPlayingIcon } from '@icons/AudioPlayingIcon'
import { MicrophoneIcon } from '@icons/MicrophoneIcon'
import { SingleIcon } from '@icons/SingleIcon'
import type { Song } from '@typesDef/api'

import { ButtonDeletePlaylist } from '../button-delete-playlist/ButtonDeletePlaylist'

import { useAsideMenu } from './useAsideMenu'

interface Props {
  cover: string | null
  id: string
  songs: Song[]
  subtitle: string
  title: string
  type: string
}

export function AsideMenuCardItem (props: Props) {
  const { id, title, type, subtitle, cover = null } = props

  const {
    activeLink,
    activeLinkText,
    handleClick,
    handleContextMenu,
    isOpen,
    menuRef,
    isPlayingPlayList
  } = useAsideMenu({ id })

  if (isOpen) {
    return (
      <div ref={menuRef}>
        <ButtonDeletePlaylist id={id} />
      </div>
    )
  }

  return (

    <div
      className='playlist-item-aside group relative
      flex cursor-pointer items-center gap-3
      rounded-md
      p-2.5
      md:p-2 md:px-5
      h-16 w-full
      justify-between
      z-10
      focus:ring-violet-300
      outline-none hover:bg-zinc-500/10 hover:shadow-xl focus:bg-zinc-500/50
      '
      data-id={id}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <picture className='aspect-square h-[50px] w-[50px] flex-none rounded-md overflow-hidden bg-white/10'>
        {
          cover && (
            <>
              <img
                alt={`Cover of ${title}`}
                className='h-full w-full object-cover'
                src={`${cover}`}
              />
            </>
          )
        }
        {
          !cover && (
            <div className='flex h-full w-full items-center justify-center '>
              <div className='h-[40px] w-[40px]'>
                <AlbumIcon />
              </div>
            </div>
          )
        }
      </picture>
      <div className='hidden md:flex w-full'>
        <div className='flex flex-col truncate flex-1'>
          <h4 className={`text-md font-semibold flex items-center gap-1 ${activeLink}`}>
            <span className='size-4 flex'>
              {
                (type === 'album')
                  ? <AlbumIcon />
                  : <SingleIcon />
              }
            </span>  {title}
          </h4>
          <h3 className={`text-md flex gap-1 items-center  ${activeLinkText}`}>
            <span className="size-3 flex"><MicrophoneIcon /></span>
            {subtitle}
          </h3>
        </div>
      </div>
      <div
        className='flex h-[50px] w-[50px] md:h-[30px] md:w-[30px]  absolute  md:right-1 lg:right-2 items-center justify-center text-green-500 z-10'
      >
        {isPlayingPlayList && (

          <div className='bg-black/90  md:bg-transparent absolute flex w-full h-full z-0 items-center justify-center rounded-md overflow-hidden'>
            <AudioPlayingIcon size={16} />
          </div>

        )}

      </div>
    </div>
  )
}
