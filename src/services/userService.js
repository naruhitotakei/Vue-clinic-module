export async function login (loginEmail, loginPassword) {
  console.log('check if it works here', loginEmail)
  const rawResponse = await fetch('https://staging-prm.emazing.si/api/login', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'loginEmail': loginEmail, 'loginPassword': loginPassword })
  })
  console.log('raw response', rawResponse)
  return rawResponse.json()
}
export async function enquiry () {
  const rawResponse = await fetch('https://staging-prm.emazing.si/api/enquiries', {
    mode: 'no-cors',
    headers: {
      'Accept': 'application/json'
    }
  })
  console.log('raw response', rawResponse)
  return rawResponse.json()
}
