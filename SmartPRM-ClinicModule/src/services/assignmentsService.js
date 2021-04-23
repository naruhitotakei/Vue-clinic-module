export async function getAssignments () {
  const rawResponse = await fetch('/api/assignments', {
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
