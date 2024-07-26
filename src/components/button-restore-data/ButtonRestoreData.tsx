import { useState } from 'react'

import { Tooltip } from '@components/ui/Tooltip'
import { LoaderIcon } from '@icons/LoaderIcon'
import { RestoreIcon } from '@icons/RestoreIcon'

export function ButtonRestoreData () {
  const [show, setShow] = useState(true)
  const [showToast, setShowToast] = useState(false)

  const handleRestoreData = async () => {
    setShow(false)
    const res = await fetch('/api/internal/get-mock-musics.json')
    const data = await res.json()

    if (data.message === 'ok') {
      ShowToast()
    }

    setShow(true)
  }

  function ShowToast () {
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 5000)
  }

  return (
    <>
      <Tooltip
        content='Restablecer datos.'
        id='restore-data'
      >

        <div
          className={`size-5 ${show ? 'cursor-pointer' : 'cursor-not-allowed user-select-none'}`}
          onClick={ handleRestoreData}
        >
          {show
            ? <RestoreIcon />
            : <LoaderIcon />
          }

        </div>
      </Tooltip>

      {
        (showToast) && (
          <div className="absolute left-0 flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-green-500 bg-white divide-x rtl:divide-x-reverse divide-green-200 rounded-lg shadow dark:text-green-400 dark:divide-green-700 space-x dark:bg-green-800" id="toast-simple" role="alert">
            <svg aria-hidden="true" className="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45" fill="none" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg">
              <path d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <div className="ps-4 text-sm font-normal">Datos restaurados</div>
          </div>
        )
      }

    </>
  )
}
