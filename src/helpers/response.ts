interface CommonResponse<T> {
  data?: T | null
  error?: string | null
}

export function response<T> ({ data = null, error = null }: CommonResponse<T>): Response {
  return new Response(JSON.stringify({ data, error }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
