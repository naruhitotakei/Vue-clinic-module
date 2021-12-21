export async function getAppointmentsLocations () {
  const rawResponse = await fetch('/api/appointments/locations', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getAppointmentsDoctors () {
  const rawResponse = await fetch('/api/appointments/doctors', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getAppointments (filterLocation, filterDoctor, filterDate) {
  const rawResponse = await fetch('/api/appointments?location=' + filterLocation + '&doctor=' + filterDoctor + '&date=' + filterDate, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}
