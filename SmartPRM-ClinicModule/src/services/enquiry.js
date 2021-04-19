export async function enquiry () {
  const rawResponse = await fetch('/api/enquiries', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  console.log('raw response', rawResponse)
  return rawResponse.json()
}

export async function enquiryById (id) {
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

// enquiry syntax
// all elements are optionall
// {
//   name: 'ime',
//   phone: 'tel',
//   email: 'email',
//   client_id: 23,
//   country_id: 1,
//   region_id: 23,
//   gender: 'female',
//   last_name: 'priimek',
//   lead_owner_id: 0
// }
export async function createEnquiry (enquiry) {
  const rawResponse = await fetch('/api/enquiries/', {
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

export async function updateEnquiry (id, enquiry) {
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

export async function deleteEnquiry (id) {
  const rawResponse = await fetch('/api/enquiries/' + id, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}
