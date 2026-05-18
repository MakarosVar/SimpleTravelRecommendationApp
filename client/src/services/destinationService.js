const API_URL = 'http://localhost:5000/api/destinations';

export async function getDestinations() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Could not load destinations.');
  }

  return response.json();
}

export async function getDestinationById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error('Could not load destination.');
  }

  return response.json();
}
