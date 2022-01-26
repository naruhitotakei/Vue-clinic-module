export async function getAppointmentsLocations() {
  const rawResponse = await fetch('/api/appointments/locations', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function getAppointmentsDoctors() {
  const rawResponse = await fetch('/api/appointments/doctors', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function getAppointments(
  filterLocation,
  filterDoctor,
  filterDate,
  locale
) {
  const rawResponse = await fetch(
    '/api/appointments?location=' +
      filterLocation +
      '&doctor=' +
      filterDoctor +
      '&date=' +
      filterDate +
      '&locale=' +
      locale,
    {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
  return rawResponse.json()
}

export async function updateLevelOfInterest(updateData) {
  const rawResponse = await fetch('/api/appointments/update_interest', {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  })
  return rawResponse.json()
}

export async function updateClinicNotes(updateClinicNotesData) {
  const rawResponse = await fetch('/api/appointments/update_clinic_notes', {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateClinicNotesData),
  })
  return rawResponse.json()
}

export async function updateCallCenterNotes(updateCallCenterNotesData) {
  const rawResponse = await fetch('/api/appointments/update_call_center_notes', {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateCallCenterNotesData),
  })
  return rawResponse.json()
}

export async function updateAttendance(updateAttendanceData) {
  const rawResponse = await fetch('/api/appointments/update_attendance', {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateAttendanceData),
  })
  return rawResponse.json()
}

export async function createAppointment(payload) {
  const response = await fetch(`/api/appointments`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  const result = await response.json()

  if (response.ok === false) {
    throw result
  }

  return result
}
