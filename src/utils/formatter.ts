export const formatListSeparatedByCommas = new Intl.ListFormat('es', {
  style: 'long',
  type: 'conjunction'
} as const)

export function formatDuration (durationInSeconds: number) {
  if (durationInSeconds === Infinity) {
    return {
      formattedDurationWithText: '∞',
      formatedDuration: '∞'
    }
  }

  if (durationInSeconds === null) {
    return {
      formattedDurationWithText: '0 horas 0 minutos 0 segundos',
      formatedDuration: '0:00'
    }
  }

  const hours = Math.floor(durationInSeconds / 3600)
  const minutes = Math.floor((durationInSeconds % 3600) / 60)

  const seconds = Math.floor(durationInSeconds % 60)

  let formattedDurationWithText = ''

  if (hours > 0) {
    formattedDurationWithText += hours + ' horas '
  }

  if (minutes > 0 || hours > 0) {
    formattedDurationWithText += minutes + ' minutos '
  }

  formattedDurationWithText += seconds + ' segundos'

  const formatedDuration = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`

  return {
    formatWithText: formattedDurationWithText,
    format: formatedDuration
  }
}
