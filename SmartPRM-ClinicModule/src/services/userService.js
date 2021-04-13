export async function login (loginEmail, loginPassword) {
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

export async function logout () {
  await fetch('/api/logout', {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    }
  })
}

export async function changePassword (oldPassword, newPassword1, newPassword2) {
  const rawResponse = await fetch('/api/password', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'oldpassword': oldPassword, 'password1': newPassword1, 'password2': newPassword2 })
  })
  return rawResponse.json()
}
