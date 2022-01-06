export async function getAvailableDates(params) {
  const response = await fetch(`/api/available-dates?${new URLSearchParams(params)}`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
  })

  return response.json()
}
