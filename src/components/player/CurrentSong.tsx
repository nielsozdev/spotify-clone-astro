import { AlbumIcon } from '@icons/AlbumIcon'

import './styles.css'

interface Props {
  album: string
  artist: string
  artistId: string
  cover: string
  disabled: boolean
  title: string

}
export function CurrentSong ({ cover, title, artist, artistId, disabled }: Props) {
  return (
    <div className="min-w-[180px] w-[30%]">
      <div className="flex-row flex justify-start relative items-center transform translate-x-0 overflow-hidden">
        <div className='isolate shrink-0 relative rounded overflow-hidden bg-[#282828] w-14 h-14 items-center justify-center me-2 flex'>
          <a
            aria-label='Current Song'
            className={`${disabled ? 'pointer-events-none' : 'cursor-pointer'}`}
            href={`/artista/${artistId}`}
          >

            <picture className='h-14 w-14'>
              {
                cover && (
                  <>
                    <img
                      alt={title}
                      src={cover}
                    />
                  </>
                )
              }
              {
                !cover && (
                  <div className='h-14 w-14'>{
                    <>
                      { title && <AlbumIcon />}
                    </>
                  }
                  </div>
                )
              }
            </picture>
          </a>
        </div>
        <div className="current-song overflow-hidden">
          <div className='[grid-area:title] text-white justify-self-start w-full'>
            <div className="ml-[6px] mr-[-6px] overflow-hidden relative">
              <div className="overflow-hidden flex p-[6px 12px]  w-fit transform translate-x-0 truncate ">  {title}</div>
            </div>

          </div>
          {/* <div className='[grid-area:pretitle] text-white justify-self-start w-full'>
          <div className="ml-[6px] mr-[-6px] overflow-hidden relative">
            <div className="overflow-hidden flex p-[6px 12px]  w-fit transform translate-x-0 truncate ">  {album}</div>
          </div>

        </div> */}
          <div className='[grid-area:subtitle] text-white justify-self-start w-full'>
            <div className=" overflow-hidden relative">
              <div className="overflow-hidden flex p-[6px 12px]  w-fit transform translate-x-0 truncate ">  {artist}</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
