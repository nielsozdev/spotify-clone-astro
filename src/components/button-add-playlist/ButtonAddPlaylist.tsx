import { Tooltip } from '@components/ui/Tooltip'
import { PlaylistAddIcon } from '@icons/PlaylistAddIcon'
import { PlusIcon } from '@icons/PlusIcon'

export function ButtonAddPlaylist () {
  const getData = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const formData = new FormData()
    formData.append('title', 'usuario')

    const res = await fetch('/api/create-playlist', {
      method: 'POST',
      body: formData,
      redirect: 'manual'
    })
    const { data } = await res.json()
    return data
  }

  const handleCreatePlaylist = async (e: any) => {
    await getData(e)

    // navigate(`/playlists/${id}`)
  }

  return (
    <div className="relative">
      <div className="group relative flex items-center">
        <Tooltip content='Crear playlist' id='create-playlist'>
          <div className=" rounded ">
            <span className="size-5 flex">
              <PlusIcon />
            </span>
          </div>
        </Tooltip>
        <nav
          className="border  bg-zinc-800 z-50 invisible border-zinc-800 rounded-md w-60 absolute left-0 top-full transition-all
        opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1" tabIndex={0}
        >
          <ul className="py-1">
            <li className='flex w-full items-center cursor-pointer'>
              <div
                className=" px-4 py-2 w-full hover:bg-zinc-700/50 flex items-center gap-4"
                onClick={handleCreatePlaylist}
              >
                <span className="size-6">  <PlaylistAddIcon /></span> Agregar playlist
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
