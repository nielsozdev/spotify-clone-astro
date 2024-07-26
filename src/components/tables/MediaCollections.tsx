import { ButtonPlayerSong } from '@components/button-player-song/ButtonPlayerSong'
import { WrapperButtonPlayerSong } from '@components/button-player-song/WrapperButtonPlayerSong'
import { AlbumIcon } from '@icons/AlbumIcon'
import { TimeIcon } from '@icons/TimeIcon'
import { type MusicSource, type Song } from '@typesDef/api'
import { capitalizeName } from '@utils/capitalizeName'
import { formatDuration } from '@utils/formatter'

interface Props {
  id: string
  songs: Song[]
  type: MusicSource
}

export function MediaCollections ({ songs, id, type }: Props) {
  return (
    <div className='w-full overflow-x-hidden mb-5'>
      <table className='min-w-full  divide-y divide-gray-500/20 text-left'>
        <thead className=''>
          <tr className='text-sm text-zinc-400'>
            <th className='px-3 md:px-4 py-2 font-normal'>#</th>
            <th className='px-3 md:px-4 py-2 font-normal '>Título</th>
            <th className='px-3 md:px-4 py-2 font-normal'>Álbum</th>
            <th className='px-3 md:px-4 py-2 font-normal'>Autor</th>
            <th className='px-3 md:px-4 py-2 font-normal '><div className='size-4'><TimeIcon /></div></th>
          </tr>
        </thead>

        <tbody>
          <tr className='h-[15px]' />
          {
            songs.map((song, index) => (
              <tr
                key={`${song.id}-${index}`} className='group cursor-pointer overflow-hidden text-sm font-light text-gray-300  transition-all duration-300 hover:bg-white/10'
              >
                <td className='relative w-5  rounded-bl-lg  rounded-tl-lg '>
                  <div className='absolute top-0 z-10 flex h-full w-full items-center justify-center opacity-100 group-hover:opacity-0'>
                    {index + 1}
                  </div>
                  <ButtonPlayerSong id={id} song={song} type={type} />
                </td>
                <td className='flex gap-3 px-3 md:px-4 py-2'>
                  <WrapperButtonPlayerSong id={id} song={song} type={type}>
                    <div className='h-10 flex items-center gap-2 w-full'>
                      <picture className='aspect-square rounded-md bg-white/10'>
                        <div className='size-10 flex items-center'>
                          <AlbumIcon />
                        </div>
                      </picture>
                      <div className='flex flex-col'>
                        <div className='font-bold truncate'>{capitalizeName(song.title)}</div>
                        <span className='truncate'>{song?.artist}</span>
                      </div>
                    </div>
                  </WrapperButtonPlayerSong>
                </td>
                <td className='px-3 md:px-4 py-2'>
                  <WrapperButtonPlayerSong id={id} song={song} type={type}>
                    <span className="truncate">{capitalizeName(song.album)}</span>
                  </WrapperButtonPlayerSong>
                </td>
                <td className='px-3 md:px-4 py-2'>
                  <WrapperButtonPlayerSong id={id} song={song} type={type}>
                    <span className="truncate">{capitalizeName(song.artist, 'name')}
                    </span></WrapperButtonPlayerSong>
                </td>
                <td className='rounded-br-lg rounded-tr-lg  px-3 md:px-4 py-2 '>
                  <WrapperButtonPlayerSong id={id} song={song} type={type}>
                    {formatDuration(song?.metadata?.duration ?? 0).format}
                  </WrapperButtonPlayerSong>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
