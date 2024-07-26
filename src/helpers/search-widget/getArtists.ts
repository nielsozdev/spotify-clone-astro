import Fuse from 'fuse.js'

import { fetchData } from './fetchData'
import { generateSearchList } from './generateSearchList'
import type { GetArtist } from './types'

export async function getArtists ({ searchTerm, searchData }: GetArtist) {
  let FUSE_INSTANCE: any = null

  const resultsList = document.getElementById(
    'search-results'
  ) as HTMLUListElement

  if (searchTerm.length < 0) return

  searchData = await fetchData()

  if (searchData && !FUSE_INSTANCE) {
    const FUSE_OPTIONS = {
      includeScore: true,
      shouldSort: true,
      threshold: 0.6,
      keys: [
        {
          name: 'name',
          weight: 1
        },
      ]
    }

    FUSE_INSTANCE = new Fuse(searchData as readonly unknown[], FUSE_OPTIONS)
  }

  if (!FUSE_INSTANCE) return
  const searchResult = FUSE_INSTANCE.search(searchTerm) as [any]
  resultsList.innerHTML =
    searchResult.length > 0
      ? generateSearchList(searchResult)
      : ''
  return searchResult
}
