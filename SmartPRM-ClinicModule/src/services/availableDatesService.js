export async function getAvailableDates (params) {
  const response = await fetch(`/api/available-dates`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  })

  return response.json()
}
