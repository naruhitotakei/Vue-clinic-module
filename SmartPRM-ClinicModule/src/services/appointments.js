export async function createAppointment(payload) {
  const response = await fetch(`/api/appointments`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  const result = await response.json()

  if (response.ok === false) {
    throw result
  }

  return result
}
