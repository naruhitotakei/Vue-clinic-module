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
