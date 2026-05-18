import { handleResponse } from '../utils/handleResponse';

const API_URL = 'http://localhost:5000/api/destinations';

export async function getDestinations() {
  const response = await fetch(API_URL);

  return handleResponse(response);
}

export async function getDestinationById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return handleResponse(response);
}
