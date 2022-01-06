export async function getEmazingServicesReport(startdate, endate, countrySelect) {
  const rawResponse = await fetch('/api/report/emazing/services/' + startdate + '/' + endate + '/' + countrySelect, {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function getServiceList(startdate, endate, countrySelect) {
  const rawResponse = await fetch('/api/report/emazing/serviceslist/' + startdate + '/' + endate + '/' + countrySelect, {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function getCountryList(startdate, endate) {
  const rawResponse = await fetch('/api/report/emazing/countrylist/' + startdate + '/' + endate, {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function getClinicStatistics() {
  const rawResponse = await fetch('/api/statistics/clinic', {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
    },
  })
  return rawResponse.json()
}
