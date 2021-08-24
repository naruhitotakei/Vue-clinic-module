export async function getTodaysAppointments (locale) {
  const rawResponse = await fetch('/api/home/todays-appointments/' + locale, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getStaff () {
  const rawResponse = await fetch('/api/home/staff', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getAssignmentsForUser () {
  const rawResponse = await fetch(`/api/home/open-assignments`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function updateAppointment (id, appointment) {
  const rawResponse = await fetch('/api/home/appointment/' + id, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(appointment)
  })
  return rawResponse.json()
}
