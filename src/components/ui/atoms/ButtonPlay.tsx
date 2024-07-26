import { PauseIcon } from '@icons/PauseIcon'
import { PlayIcon } from '@icons/PlayIcon'

interface Props {
  bgColor?: 'green' | 'white' | 'transparent' | null
  disabled?: boolean
  iconPause?: React.FC<{ size: number }>
  iconPlay?: React.FC<{ size: number }>
  iconType?: string
  onClick?: () => void
  size?: 'normal' | 'small' | 'big'

}

const sizes = {
  small: 48,
  normal: 54,
  big: 60

}

const bgColorClass = {
  white: 'bg-white',
  green: 'bg-green-600',
  transparent: 'bg-transparent'
}

const iconColorClass = {
  white: 'text-black',
  green: 'text-white',
  transparent: 'text-white'

}

export function ButtonPlay ({ size = 'small', bgColor = null, iconType = 'play', disabled = false, iconPlay: IconPlay = PlayIcon, iconPause: IconPause = PauseIcon, ...props }: Props) {
  const buttonSize = sizes[size as keyof typeof sizes] || sizes.small
  const backgroundColor = bgColor ? bgColorClass[bgColor] : bgColorClass.green
  const IconColor = bgColor ? iconColorClass[bgColor] : iconColorClass.green
  return (
    <button
      aria-label={`${iconType === 'play' ? 'Play' : 'Pause'}`}
      className={`flex ${backgroundColor} relative  items-center justify-center rounded-full transition-all duration-100 hover:scale-105` + (disabled ? ' opacity-50 cursor-not-allowed' : '') }
      disabled={disabled}
      style={{
        height: `${buttonSize}px`,
        width: `${buttonSize}px`
      }}
      {...props}
    >
      <span className='flex items-center justify-center'>
        <span
          className={`absolute flex h-[${buttonSize}px] w-[${buttonSize}px] items-center ${IconColor}`}
        >
          {iconType === 'play' && <IconPlay size={buttonSize} />}
          {iconType === 'pause' && <IconPause size={buttonSize} />}
        </span>
      </span>
    </button>

  )
}
