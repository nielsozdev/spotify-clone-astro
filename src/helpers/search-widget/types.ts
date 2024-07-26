interface Base {
  search: HTMLInputElement | null
  searchData: any
  searchTerm: string
}

export type Update = Base
export type UpdateDocumentTitle = Omit<Base, 'search' | 'searchData'>
export type SearchReadout = Omit<Base, 'searchData' | 'search'> & {
  data: any
}
export type UpdateSearchPageURL = Omit<Base, 'searchData' | 'search'>

export interface HandleSubmit {
  form: HTMLFormElement
}

export type GetArtist = Omit<Base, 'search'>
