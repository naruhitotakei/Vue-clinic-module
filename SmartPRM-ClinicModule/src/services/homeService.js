export async function getTodaysAppointments () {
  const rawResponse = await fetch('/api/home/todays-appointments', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}
