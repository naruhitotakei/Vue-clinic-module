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

export async function updateLevelOfInterest (updateData) {
  const rawResponse = await fetch('/api/appointments/update_interest', {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  })
  return rawResponse.json()
}

export async function updateNotes (updateNotesData) {
  const rawResponse = await fetch('/api/appointments/update_notes', {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateNotesData)
  })
  return rawResponse.json()
}
