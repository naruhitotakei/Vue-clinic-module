export async function getFreeSlots () {
  const rawResponse = await fetch(`/api/calendar/free-slots/`, {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function createFreeSlots (slot) {
  const rawResponse = await fetch('/api/calendar/create-free-slots', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(slot)
  })
  return rawResponse.json()
}

export async function deleteFreeSlot (id) {
  const rawResponse = await fetch(`/api/calendar/delete-free-slot/${id}`, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return rawResponse.json()
}
