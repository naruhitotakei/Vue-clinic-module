export async function getOnlineBookingProducts (locale) {
  const rawResponse = await fetch('/api/online-booking-products/' + locale, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getOnlineBookingProductsNaming (id) {
  const rawResponse = await fetch('/api/online-booking-products/' + id + '/naming', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getOnlineBookingProductsPublic (locale) {
  const rawResponse = await fetch('/api/public/online-booking-products/' + locale, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getOnlineBookingProductGroups (locale) {
  const rawResponse = await fetch('/api/online-booking-product-groups/' + locale, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getPremises () {
  const rawResponse = await fetch('/api/premises', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function createOnlineBookingService (service) {
  const rawResponse = await fetch('/api/add-online-booking-service', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(service)
  })
  return rawResponse.json()
}

export async function deleteOnlineBookingService (id) {
  const rawResponse = await fetch('/api/delete-online-booking-service/' + id, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function updateOnlineBookingService (id, service) {
  const rawResponse = await fetch('/api/update-online-booking-service/' + id, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(service)
  })
  return rawResponse.json()
}
