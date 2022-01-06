export async function uploadAvatar(file) {
  var data = new FormData()
  data.append('file', file)
  const rawResponse = await fetch('/api/files/avatar', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
    },
    body: data,
  })
  return rawResponse.json()
}

export async function getFilesWithPrefix(prefix) {
  const rawResponse = await fetch('/api/' + prefix + '/files', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function downloadFile(fileName) {
  const rawResponse = await fetch('/api/files/' + fileName + '/download', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function fileUpload(file, id) {
  let data = new FormData()
  data.append('file', file)
  const rawResponse = await fetch(`/api/files/upload/${id}`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
    },
    body: data,
  })
  return rawResponse.json()
}

export async function userAvatarUpload(file, id) {
  let data = new FormData()
  data.append('file', file)
  const rawResponse = await fetch(`/api/files/avatar/${id}`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
    },
    body: data,
  })
  return rawResponse.json()
}

export async function getUserAvatar(id) {
  const rawResponse = await fetch(`/api/files/avatar/${id}`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
    },
  })
  return rawResponse.json()
}
