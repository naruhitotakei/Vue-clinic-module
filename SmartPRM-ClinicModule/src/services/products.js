export async function getProducts () {
  const rawResponse = await fetch('/api/products', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getProductGroups () {
  const rawResponse = await fetch('/api/productGroups', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getProductCategories () {
  const rawResponse = await fetch('/api/productCategories', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getProductTypes () {
  const rawResponse = await fetch('/api/productTypes', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}
