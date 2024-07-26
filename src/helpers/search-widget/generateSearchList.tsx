export function generateSearchList (results: [any]) {
  return results
    .map((result: any) => {
      const { cover, name, id, songs } = result.item
      return `<li class='flex items-center justify-center  p-2 w-36 md:w-48 overflow-hidden dark:border-gray-600 flex-col
                        hover:bg-zinc-800 rounded-md transition-all duration-300 '>
                        <a href='/artista/${id}' class='flex items-center justify-center flex-col'>
                            <div class="md:w-40 md:h-40 w-24 h-24 rounded-full overflow-hidden">
                            <picture class='aspect-square h-auto w-full  flex-none'>
                            <img src='${cover}' alt='${name}' class='object-cover object-center  rounded-lg' />
                            </picture></div>

                        <div class='flex flex-col  items-center  mt-4  w-full max-w-40'>
                          <h2 class='text-md font-semibold w-full truncate  overflow-hidden max-w-40 flex'>${name}</h2>
                          <p class='text-sm text-gray-500 dark:text-gray-400'>${songs.length} Canciones</p>
                        </div>
                </a>
              </li>`
    })
    .join('')
}
