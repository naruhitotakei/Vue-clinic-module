export async function getAppointmentsWithoutServices(start, end) {
  const rawResponse = await fetch('/api/call-center/missing-services/' + start + '/' + end, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function getPrmClient() {
  const rawResponse = await fetch('/api/call-center/prm-client-info', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function updatePrmClientInfo(info) {
  const assignmentDescriptor = {
    info: info,
  }
  const rawResponse = await fetch('/api/call-center/update-prm-client-info', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(assignmentDescriptor),
  })
  return rawResponse.json()
}
