export async function getEmazingServicesReport (startdate, endate) {
  const rawResponse = await fetch('/api/statistics/emazing/services/' + startdate + '/' + endate, {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getServiceList (startdate, endate) {
  const rawResponse = await fetch('/api/statistics/emazing/serviceslist/' + startdate + '/' + endate, {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    }
  })
  return rawResponse.json()
}
