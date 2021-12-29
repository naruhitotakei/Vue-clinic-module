export async function createAppointment(payload) {
  const rawResponse = await fetch(`/api/appointments`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  return rawResponse.json()
}
