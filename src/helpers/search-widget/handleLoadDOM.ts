import DOMPurify from 'dompurify'

import type { Update } from './types'
import { update } from './update'

export async function handleLoadDOM ({ search, searchTerm, searchData }: Update) {
  searchTerm = DOMPurify.sanitize(
    new URLSearchParams(window.location.search)?.get('q') ?? ''
  )

  await update({ search, searchTerm, searchData })
}
