import { ForwardButton } from '@components/ui/atoms/ForwardButton'

import { useButtonForward } from './useButtonForward'

interface Props {
  [key: string]: any
  id: string
}
export function ButtonForwardSong ({ id, ...props }: Props) {
  const { handlePlayNextSong, disabledButton } = useButtonForward({ id })

  return (
    <ForwardButton
      disabled={disabledButton}
      onClick={handlePlayNextSong}
      {...props}
    />
  )
}
