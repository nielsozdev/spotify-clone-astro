import type { SVGProps } from 'react'

interface AudioPlayingIconProps extends SVGProps<SVGSVGElement> {
  color?: string
  size?: number
}

export function AudioPlayingIcon ({ size = 24 }: AudioPlayingIconProps) {
  return (
    <svg
      aria-hidden="true"
      aria-label="Volumen bajo"
      data-encore-id="icon"
      fill="currentColor"
      height={`${size}px`}
      id="volume-icon"
      role="presentation"
      viewBox="0 0 16 16"
      width={`${size}px`}
      xmlns="http://www.w3.org/2000/svg"

    >
      <path d="M10.016 1.125A.75.75 0 0 0 8.99.85l-6.925 4a3.639 3.639 0 0 0 0 6.299l6.925 4a.75.75 0 0 0 1.125-.65v-13a.75.75 0 0 0-.1-.375zM11.5 5.56a2.75 2.75 0 0 1 0 4.88V5.56z" />
      <path d="M16 8a5.752 5.752 0 0 1-4.5 5.614v-1.55a4.252 4.252 0 0 0 0-8.127v-1.55A5.752 5.752 0 0 1 16 8z" />
    </svg>
  )
}