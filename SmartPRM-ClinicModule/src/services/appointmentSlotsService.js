export async function getFreeSlots () {
  const rawResponse = await fetch(`/api/calendar/free-slots/`, {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  })
  return rawResponse.json()
}
