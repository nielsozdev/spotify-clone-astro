import { ForwardIcon } from '@icons/ForwardIcon'

interface Props {
  bgColor?: 'green' | 'white' | 'transparent' | null
  disabled?: boolean
  onClick?: () => void
  size?: 'normal' | 'small' | 'big'

}

const sizes = {
  smallest: 12,
  smaller: 18,
  small: 24,
  normal: 36,
  big: 48,
  bigger: 64,
  biggest: 96

}

const iconColorClass = {
  white: 'text-black',
  green: 'text-white',
  transparent: 'text-white'

}
export function ForwardButton ({ size = 'normal', bgColor = null, disabled = false, ...props }: Props) {
  const buttonSize = sizes[size as keyof typeof sizes] || sizes.small
  const IconColor = bgColor ? iconColorClass[bgColor] : iconColorClass.green

  return (
    <button
      aria-label='Forward'
      className={'flex relative items-center justify-center rounded-full transition-all duration-100 hover:scale-105' + (disabled ? ' opacity-50 cursor-not-allowed' : '') }
      disabled={disabled}
      style={{
        height: `${buttonSize}px`,
        width: `${buttonSize}px`
      }}
      {...props}
    >
      <span className='flex items-center justify-center'>
        <span
          className={` absolute flex h-[${buttonSize}px] w-[${buttonSize}px] items-center ${IconColor} text-zinc-400 hover:text-white transition-colors duration-200`}
        >
          <ForwardIcon size={buttonSize} />
        </span>
      </span>
    </button>

  )
}
