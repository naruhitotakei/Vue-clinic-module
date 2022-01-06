export async function getBusiness(locale) {
  const rawResponse = await fetch('/api/business/' + locale, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function getBusinessByID(id) {
  const rawResponse = await fetch('/api/business/' + id, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}

export async function createBusiness(business) {
  const rawResponse = await fetch('/api/business/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(business),
  })
  return rawResponse.json()
}

export async function updateBusiness(id, business) {
  const rawResponse = await fetch('/api/business/' + id, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(business),
  })
  return rawResponse.json()
}

export async function deleteBusiness(id) {
  const rawResponse = await fetch('/api/business/' + id, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return rawResponse.json()
}
