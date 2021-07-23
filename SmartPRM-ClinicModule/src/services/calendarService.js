// doctorUserIdList == null - all doctors according to role
export async function getCalendar (startdate, endate, doctorUserIdList, lang) {
  var url = '/api/calendar/' + startdate + '/' + endate + '/' + lang
  if (doctorUserIdList && doctorUserIdList.length > 0) {
    url += encodeURI(JSON.stringify(doctorUserIdList))
  }
  const rawResponse = await fetch(url, {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function updateCalendar (id, appointment) {
  const rawResponse = await fetch('/api/calendar/' + id, {
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

export async function createCalendar (appointment) {
  const rawResponse = await fetch('/api/calendar/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(appointment)
  })
  return rawResponse.json()
}

export async function updateCalendarLabel (id, appointment) {
  const rawResponse = await fetch('/api/calendar/label/' + id, {
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

export async function createCalendarLabel (id, appointment) {
  const rawResponse = await fetch('/api/calendar/label/' + id, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(appointment)
  })
  return rawResponse.json()
}

export async function getDoctorList () {
  const rawResponse = await fetch('/api/calendar/doctors', {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getLabels () {
  const rawResponse = await fetch('/api/calendar/labels', {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    }
  })
  return rawResponse.json()
}
