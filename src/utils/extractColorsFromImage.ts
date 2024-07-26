import * as pathModule from 'path'

import Vibrant from 'node-vibrant'

export async function extractColors (pathname: string) {
  const path = `${process.cwd()}/public/${pathname}`

  if (pathModule.extname(path) !== '.jpg') return null

  const palette = await Vibrant.from(path).getPalette()
  return palette
}

export async function extractColorsFromImage (
  path: string
): Promise<string | null> {
  try {
    await extractColors(path)

    const color = (await extractColors(path))?.DarkMuted?.hex

    return color ?? null
  } catch (error) {
    console.error('Error al extraer colores:', error)

    return null
  }
}
