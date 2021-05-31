export async function getAssignments (due) {
  const rawResponse = await fetch('/api/assignments/' + due, {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    }
  })
  return rawResponse.json()
}

export async function finishAssignment (id, finished) {
  const assignmentDescriptor = {
    id: id,
    finished: finished
  }
  const rawResponse = await fetch('/api/assignments/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(assignmentDescriptor)
  })
  return rawResponse.json()
}

export async function createAssignments (assignments) {
  const rawResponse = await fetch('/api/assignments-create', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(assignments)
  })
  return rawResponse.json()
}
