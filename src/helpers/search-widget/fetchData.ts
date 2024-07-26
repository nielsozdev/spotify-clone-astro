export async function fetchData () {
  try {
    const URL = '/api/get-artists.json'

    const response = await fetch(`${URL}`)
    if (!response.ok) {
      throw new Error('Error fetching artists')
    }

    const { data } = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching artists', error)
  }
}
