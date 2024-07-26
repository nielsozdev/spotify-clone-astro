import fs from 'fs'

export function writeJsonFile (path: string, data: any) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
}
