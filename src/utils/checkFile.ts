import fs from 'fs'

export function checkFile (pathFile: string, file: string) {
  const res = fs.existsSync(pathFile)
  if (!res) {
    console.error(`File ${file} not found in ${pathFile}`)
  }

  return res
}
