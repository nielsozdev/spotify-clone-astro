export async function getDataFromApi (url: string) {
  try {
    const response = await fetch(url)

    const { data } = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data from API:', error)
    throw new Error('Error fetching data from API')
  }
}
