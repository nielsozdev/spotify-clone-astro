/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/env.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare namespace Intl {
  type ListType = 'conjunction' | 'disjunction'

  interface ListFormatOptions {
    localeMatcher?: 'lookup' | 'best fit'
    style?: 'long' | 'short' | 'narrow'
    type?: ListType
  }

  interface ListFormatPart {
    type: 'element' | 'literal'
    value: string
  }

  class ListFormat {
    constructor (locales?: string | string[], options?: ListFormatOptions)
    format (values: any[]): string
    formatToParts (values: any[]): ListFormatPart[]
    supportedLocalesOf (
      locales: string | string[],
      options?: ListFormatOptions,
    ): string[]
  }
}

interface ImportMetaEnv {
  readonly DOMAIN: string
  // más variables de entorno...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
