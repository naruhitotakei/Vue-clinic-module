export async function sendSms(data) {
  const response = await fetch('/api/appointments/request', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const result = await response.json()

  if (response.ok === false) {
    throw result
  }

  return result
}

export async function confirmAndSave(data) {
  const rawResponse = await fetch('/api/booking/confirm-and-save', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return rawResponse.json()
}
