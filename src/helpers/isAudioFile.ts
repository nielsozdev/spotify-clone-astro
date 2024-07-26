import path from 'path'

export function isAudioFile (filePath: string): boolean {
  const audioExtensionsAllowed = ['.mp3', '.wav', '.ogg']
  const extension: string = path.extname(filePath).toLowerCase()
  return audioExtensionsAllowed.includes(extension)
}
