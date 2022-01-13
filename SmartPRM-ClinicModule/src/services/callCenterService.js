export async function getAppointmentsWithoutServices(start, end) {
  const rawResponse = await fetch('/api/call-center/missing-services/' + start + '/' + end, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}
