export async function clinicStatisticsAttendance() {
  const rawResponse = await fetch('/api/statistics/clinic/attendance', {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function visitsByCountryInAWeek() {
  const rawResponse = await fetch('/api/statistics/visits-by-country', {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function getDoctorsStatisticPerWeek() {
  const rawResponse = await fetch('/api/statistics/doctors-per-week', {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function getRevenueByProduct(start, end) {
  const rawResponse = await fetch('/api/statistics/revenue-by-product/' + start + '/' + end, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function getRevenueByDoctor(start, end) {
  const rawResponse = await fetch('/api/statistics/revenue-by-doctor/' + start + '/' + end, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function getLeadsPerDay(start, end) {
  const rawResponse = await fetch('/api/statistics/new-leads/' + start + '/' + end, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}
