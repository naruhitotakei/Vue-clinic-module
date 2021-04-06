export async function clinicStatistics () {
  const rawResponse = await fetch('/api/statistics/clinic', {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    }
  })
  return rawResponse.json()
}