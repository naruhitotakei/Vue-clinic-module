export async function getCompanyPremises () {
  const rawResponse = await fetch('/api/company-premises', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getPremiseById (id) {
  const rawResponse = await fetch('/api/company-premises/' + id, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getPremiseDeviceById (id) {
  const rawResponse = await fetch('/api/company-premise-devices/' + id, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getCompanyPremiseDevices () {
  const rawResponse = await fetch('/api/company-premise-devices', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getPremisesForCompany (companyId) {
  const rawResponse = await fetch('/api/' + companyId + '/company-premises', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getDevicesForPremise (companyPremisesId) {
  const rawResponse = await fetch('/api/company-premises/' + companyPremisesId + '/devices', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function createPremise (premise) {
  const rawResponse = await fetch('/api/company-premises', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(premise)
  })
  return rawResponse.json()
}

export async function updatePremise (id, premise) {
  const rawResponse = await fetch('/api/company-premises/' + id, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(premise)
  })
  return rawResponse.json()
}

export async function deletePremise (id) {
  const rawResponse = await fetch('/api/company-premises/' + id, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function createPremiseDevice (premise) {
  const rawResponse = await fetch('/api/company-premise-devices', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(premise)
  })
  return rawResponse.json()
}

export async function updatePremiseDevice (id, premise) {
  const rawResponse = await fetch('/api/company-premise-devices/' + id, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(premise)
  })
  return rawResponse.json()
}

export async function deletePremiseDevice (id) {
  const rawResponse = await fetch('/api/company-premise-devices/' + id, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}
