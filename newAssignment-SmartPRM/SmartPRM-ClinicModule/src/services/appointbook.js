export default async function appointmentBook (formData) {
  console.log('check if it works here', formData)
  const rawResponse = await fetch('', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'formData': formData })
  })
  console.log('raw response', rawResponse)
  return rawResponse.json()
}
