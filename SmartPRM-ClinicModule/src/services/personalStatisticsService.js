export async function getDoctorsRevenue() {
  const rawResponse = await fetch('/api/personal-statistics/revenue-for-doctor', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}
