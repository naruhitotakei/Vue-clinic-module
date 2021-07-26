export async function getEnquires (sort) {
  const rawResponse = await fetch('/api/enquiries?sort=' + sort, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getEnquiryById (id) {
  const rawResponse = await fetch('/api/enquiries/' + id, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getEnquiryNotes (id) {
  const rawResponse = await fetch(`/api/enquiries/${id}/notes`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function createEnquiryNotes (notes) {
  const rawResponse = await fetch(`/api/enquiries/notes`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(notes)
  })
  return rawResponse.json()
}

export async function getEnquiryPastAppointments (id, locale) {
  const rawResponse = await fetch(`/api/enquiries/${id}/${locale}/past-appointments`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getEnquiryFutureAppointments (id, locale) {
  const rawResponse = await fetch(`/api/enquiries/${id}/${locale}/future-appointments`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getEnquiryAssignments (id) {
  const rawResponse = await fetch(`/api/enquiries/${id}/assignments`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getEnquiryInvoices (id, sort) {
  const rawResponse = await fetch(`/api/enquiries/${id}/invoices?sort=${sort}`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getEnquiryOffers (id) {
  const rawResponse = await fetch(`/api/enquiries/${id}/offers`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getEnquiryServices (id) {
  const rawResponse = await fetch(`/api/enquiries/${id}/services`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

// enquiry syntax
// all elements are optionall
// {
//   name: 'ime',
//   phone: 'tel',
//   email: 'email',
//   client_id: 23,
//   country_id: 1,
//   region_id: 23,
//   prm_dentist_user_id: 27
//   gender: 'female',
//   last_name: 'priimek',
//   lead_owner_id: 0
// }
export async function createEnquiry (enquiry) {
  const rawResponse = await fetch('/api/enquiries/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(enquiry)
  })
  return rawResponse.json()
}

export async function updateEnquiry (id, enquiry) {
  const rawResponse = await fetch('/api/enquiries/' + id + '/update-enquiry', {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(enquiry)
  })
  return rawResponse.json()
}

export async function trashEnquiry (id) {
  const rawResponse = await fetch('/api/enquiries/' + id + '/trashed', {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getPatients () {
  const rawResponse = await fetch('/api/patients', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}
