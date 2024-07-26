import { colors, type Color } from '@lib/colors'

export function randomColor () {
  const colorKeys = Object.keys(colors)
  const randomColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)]
  const randomColor = colors[randomColorKey as Color]
  return randomColor
}
