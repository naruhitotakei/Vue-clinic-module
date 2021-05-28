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
