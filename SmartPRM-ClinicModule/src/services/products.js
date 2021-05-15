export async function getProducts (locale) {
  const rawResponse = await fetch('/api/products/' + locale, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getProductGroups (locale) {
  const rawResponse = await fetch('/api/productGroups/' + locale, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getProductCategories (locale) {
  const rawResponse = await fetch('/api/productCategories/' + locale, {
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

export async function createProduct (product) {
  const rawResponse = await fetch('/api/products', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
  return rawResponse.json()
}

export async function updateProduct (id, product) {
  const rawResponse = await fetch('/api/products/' + id, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
  return rawResponse.json()
}

export async function deleteProduct (id) {
  const rawResponse = await fetch('/api/products/' + id, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getProductNaming (id) {
  const rawResponse = await fetch('/api/products/' + id + '/product-naming', {
    method: 'get',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getProductGroupNaming (id) {
  const rawResponse = await fetch('/api/productGroups/' + id + '/product-naming', {
    method: 'get',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function getProductCategoryNaming (id) {
  const rawResponse = await fetch('/api/productCategories/' + id + '/product-naming', {
    method: 'get',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function createProductGroup (productGroup) {
  const rawResponse = await fetch('/api/productGroups', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productGroup)
  })
  return rawResponse.json()
}

export async function updateProductGroup (id, productGroup) {
  const rawResponse = await fetch('/api/productGroups/' + id, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productGroup)
  })
  return rawResponse.json()
}

export async function deleteProductGroup (id) {
  const rawResponse = await fetch('/api/productGroups/' + id, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function createProductCategory (productCategory) {
  const rawResponse = await fetch('/api/productCategories', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productCategory)
  })
  return rawResponse.json()
}

export async function updateProductCategory (id, productCategory) {
  const rawResponse = await fetch('/api/productCategories/' + id, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productCategory)
  })
  return rawResponse.json()
}

export async function deleteProductCategory (id) {
  const rawResponse = await fetch('/api/productCategories/' + id, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}
