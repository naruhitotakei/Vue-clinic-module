export async function uploadAvatar (file) {
  var data = new FormData()
  data.append('file', file)
  const rawResponse = await fetch('/api/files/avatar', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    },
    body: data
  })
  return rawResponse.json()
}

export async function getFiles () {
  const rawResponse = await fetch('/api/files', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function fileUpload (file) {
  let data = new FormData()
  data.append('file', file)
  const rawResponse = await fetch('/api/files/upload', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    },
    body: data
  })
  return rawResponse.json()
}
