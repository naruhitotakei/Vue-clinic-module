export async function clinicStatisticsAttendance () {
  const rawResponse = await fetch('/api/statistics/clinic/attendance', {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function visitsByCountryInAWeek () {
  const rawResponse = await fetch('/api/statistics/visits-by-country', {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getDoctorsStatisticPerWeek () {
  const rawResponse = await fetch('/api/statistics/doctors-per-week', {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    }
  })
  return rawResponse.json()
}
