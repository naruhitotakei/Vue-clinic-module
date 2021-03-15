export async function enquiry () {
  const rawResponse = await fetch('/api/enquiries', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    }
  })
  console.log('raw response', rawResponse)
  return rawResponse.json()
}
