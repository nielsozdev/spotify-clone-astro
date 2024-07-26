import path from 'path'

export function getUrlFromDirectory (directoryPath: string) {
  const url = `/${path.relative('./public', directoryPath).replace(/\\/g, '/')}`
  // console.log(url)
  return url
}
