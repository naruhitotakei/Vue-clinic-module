export async function getAssignments () {
  const rawResponse = await fetch('/api/assignments', {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    }
  })
  return rawResponse.json()
}