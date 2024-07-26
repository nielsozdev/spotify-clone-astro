import { response } from '@helpers/response'
import allSingles from '@mock/api/singles.json'
import type { Single } from '@typesDef/api'
import { validateLimit } from '@utils/validateLimit'
import type { APIRoute } from 'astro'

/*

Obtener todos los albums con limite de 10 y sin limites
obtener todos los albums pero sin musicas solo con la informacion basica, con limite de 10 y sin limites
obtener un album por id con todas las musicas
obtener un album por id sin musicas

*/

export const GET: APIRoute = async ({ request }): Promise<Response> => {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id') ?? null
    const limit = url.searchParams.get('limit') ?? undefined

    if (id) {
      const single = await getSingleById(id)

      if (!single) return response({ error: 'Single not found' })

      return response<Single>({ data: single })
    }

    const singles = await getAllSingles({ limit })

    if (!singles) return response({ error: 'Singles not found' })

    return response<Single[]>({ data: singles })
  } catch (error) {
    return await Promise.reject(new Error('Internal server error'))
  }
}

async function getSingleById (id: string): Promise<Single | null> {
  const single = allSingles.find((single) => single.id === id) ?? null

  return await Promise.resolve(single as Single | null)
}

async function getAllSingles ({ limit }: { limit?: unknown | undefined }): Promise<Single[] | null> {
  const isValidLimit = validateLimit(limit)
  if (!isValidLimit) return null

  const singles = limit !== undefined ? allSingles.slice(0, Number(limit)) : allSingles.slice(0)

  return await Promise.resolve(singles as Single[])
}
