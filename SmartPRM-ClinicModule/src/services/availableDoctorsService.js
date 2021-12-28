export async function getAvailableDoctors (params) {
  const response = await fetch(`/api/available-doctors?${new URLSearchParams(params)}`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  })

  return response.json()
}
