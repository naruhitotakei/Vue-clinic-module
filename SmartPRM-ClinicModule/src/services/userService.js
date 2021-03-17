export async function login (loginEmail, loginPassword) {
  console.log('check if it works here', JSON.stringify({ 'loginEmail': loginEmail, 'loginPassword': loginPassword }))
  const rawResponse = await fetch('/api/login', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'loginEmail': loginEmail, 'loginPassword': loginPassword })
  })
  return rawResponse.json()
}

export async function sso () {
  const rawResponse = await fetch('/api/login', {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    }
  })
  return rawResponse.json()
}
