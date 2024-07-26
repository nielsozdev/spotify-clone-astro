import DOMPurify from 'dompurify'

import type { HandleSubmit } from './types'

export function handleSubmit ({ form }: HandleSubmit) {
  form?.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const searchTerm = DOMPurify.sanitize(formData.get('search')?.toString() ?? '')

    if (!searchTerm) return

    const url = new URL(window.location.pathname, window.location.origin)
    url.searchParams.set('q', searchTerm)
    window.history.pushState({}, '', url.toString())
  })
}
