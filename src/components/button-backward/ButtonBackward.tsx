import { BackwardButton } from '@components/ui/atoms/BackwardButton'

import { useButtonBackward } from './useButtonBackward'

interface Props {
  [key: string]: any
  id: string
}
export function ButtonBackwardSong ({ id, ...props }: Props) {
  const { handlePlayPrevSong, disabledButton } = useButtonBackward({ id })

  return (
    <BackwardButton
      disabled={disabledButton}
      onClick={handlePlayPrevSong}
      {...props}
    />
  )
}
