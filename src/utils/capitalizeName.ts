export function capitalizeName (nameToCapitalize: string, type: string = ''): string {
  const nameParts = nameToCapitalize.split('-')
  if (type.toLowerCase() === 'name') {
    const newName = nameParts.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    return newName.join(' ')
  } else {
    const newName = nameToCapitalize.charAt(0).toUpperCase() + nameToCapitalize.slice(1).toLowerCase()
    return newName.replace(/-/g, ' ')
  }
}
