import DOMPurify from 'dompurify'
import debounce from 'just-debounce-it'

import type { Update } from './types'
import { update } from './update'

export function handleSearchInput ({ search, searchTerm, searchData }: Update) {
  search?.addEventListener('input', () => {
    searchTerm = DOMPurify.sanitize(search.value)
    const fn = debounce(async () => await update({ search, searchTerm, searchData }), 450)
    fn()
  })
}
