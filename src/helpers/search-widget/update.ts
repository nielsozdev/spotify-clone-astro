import { getArtists } from './getArtists'
import type { Update, UpdateDocumentTitle, SearchReadout, UpdateSearchPageURL } from './types'

export async function update ({ search, searchTerm, searchData }: Update) {
  const data = await getArtists({ searchTerm, searchData })
  updateDocumentTitle({ searchTerm })
  updateSearchReadout({ searchTerm, data })
  updateSearchPageURL({ searchTerm })
  if (search) {
    search.value = searchTerm || ''
    search?.focus()
  }
}

function updateDocumentTitle ({ searchTerm }: UpdateDocumentTitle) {
  document.title = searchTerm
    ? `Resultados encontrados para ${searchTerm}`
    : 'Buscardor'
}

function updateSearchReadout ({ searchTerm, data }: SearchReadout) {
  const searchTermBold = `<span class='font-bold text-md text-green-400 italic'>${searchTerm}</span>`
  const searchReadout = document.getElementById('searchReadout') as HTMLParagraphElement

  if (searchReadout) {
    searchReadout.innerHTML = searchTerm
      ? `${data.length} resultados encontrados para  ${searchTermBold}`
      : ''
  }
}

function updateSearchPageURL ({ searchTerm }: UpdateSearchPageURL) {
  const url = new URL(window.location.href)
  url.searchParams.set('q', searchTerm)
  if (searchTerm) {
    window.history.pushState({}, '', url.toString())
  }
}
