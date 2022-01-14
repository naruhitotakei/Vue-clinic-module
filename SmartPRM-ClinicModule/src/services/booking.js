export async function sendSms(data) {
  const rawResponse = await fetch('/api/booking/sendsms', {
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
