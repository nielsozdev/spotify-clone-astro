import fs from 'fs'
import path from 'path'

import { getUrlFromDirectory } from './getUrlFromDirectory'

export async function getCoverAndBannerImageFromDirectory (pathDirectory: string) {
  const coverImage = fs.readdirSync(pathDirectory).find((file) => file.includes('cover'))
  const coverImageFile = coverImage ? getUrlFromDirectory(path.join(pathDirectory, coverImage)) : null
  const normalizedCoverImageFile = coverImageFile ? `${coverImageFile.replace(/\\/g, '/')}` : null

  const bannerImage = fs.readdirSync(pathDirectory).find((file) => file.includes('banner'))
  const bannerImageFile = bannerImage ? getUrlFromDirectory(path.join(pathDirectory, bannerImage)) : null
  const normalizedBannerImageFile = bannerImageFile ? `${bannerImageFile.replace(/\\/g, '/')}` : null

  return await Promise.resolve([normalizedCoverImageFile, normalizedBannerImageFile])
}
