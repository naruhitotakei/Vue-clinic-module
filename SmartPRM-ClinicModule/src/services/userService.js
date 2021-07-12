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

export async function editProfile (profile) {
  const rawResponse = await fetch('/api/profile', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profile)
  })
  return rawResponse.json()
}

export async function changeLang (profile) {
  const rawResponse = await fetch('/api/profile/change-lang', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profile)
  })
  return rawResponse.json()
}

export async function getDentists () {
  const rawResponse = await fetch('/api/dentists', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getSurgeons () {
  const rawResponse = await fetch('/api/surgeons', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getUsers () {
  const rawResponse = await fetch('/api/users', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getUsersForAssignments () {
  const rawResponse = await fetch('/api/users-assignments', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getRoles () {
  const rawResponse = await fetch('/api/users-roles', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function updateUser (id, user) {
  const rawResponse = await fetch('/api/users/' + id, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  return rawResponse.json()
}
