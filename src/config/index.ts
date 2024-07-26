// import path from 'path'

import HomeIcon from '@icons/Home.astro'
import SearchIcon from '@icons/Search.astro'

const ASIDE_MENU = [
  {
    title: 'Inicio',
    icon: HomeIcon,
    href: '/'
  },
  {
    title: 'Buscar',
    icon: SearchIcon,
    href: '/buscar'
  },
]

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:4321'
    : 'https://noz-spotify-clone-astro.vercel.app'

// const BASE_URL = `${path.relative('.', directoryPath).replace(/\\/g, '/')}`

export const config = {
  ASIDE_MENU,
  BASE_URL,
  BREAKPOINTS
}
