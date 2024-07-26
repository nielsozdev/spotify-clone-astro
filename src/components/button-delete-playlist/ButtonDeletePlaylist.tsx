import { useState } from 'react'

import { TrashIcon } from '@icons/TrashIcon'
import { deletePlaylist } from '@services/playlists.services'
import { navigate } from 'astro:transitions/client'

export function ButtonDeletePlaylist ({ id }: { id: string }) {
  const [deleting, setDeleting] = useState(false)
  const handleDeletePlaylist = async () => {
    setDeleting(true)
    const data = await deletePlaylist(id)
    if (data.message === 'ok') {
      navigate('/')
    }

    setDeleting(false)
  }

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <div
      className='playlist-item-aside group relative
      flex cursor-pointer items-center gap-3
      transition-all duration-300
      rounded-md
      p-2.5
      sm:p-2 sm:px-5
      h-16 w-full
      z-10
       bg-red-800 outline-none hover:bg-red-600 hover:shadow-xl focus:bg-red-500'
      onClick={handleDeletePlaylist}
      onContextMenu={handleContextMenu}
    >
      <span className='size-6'><TrashIcon /></span>  {

        deleting ? 'Eliminando..' : 'Eliminar playlist'
      }
    </div>
  )
}
