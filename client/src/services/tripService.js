const API_URL = 'http://localhost:5000/api/trips';

export async function getTripItems() {
  const response = await fetch(API_URL);

  return response.json();
}

export async function addTripItem(destinationId) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ destinationId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || 'Could not add destination to trip.',
    );
  }

  return response.json();
}

export async function updateTripItem(destinationId, updates) {
  const response = await fetch(API_URL + '/' + destinationId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || 'Could not update trip item.',
    );
  }

  return response.json();
}
export async function deleteTripItem(destinationId) {
  const response = await fetch(API_URL + '/' + destinationId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || 'Could not delete trip item.',
    );
  }

  return response.json();
}
