import { DESTINATIONS_API_URL } from '../config/api';
import { handleResponse } from '../utils/handleResponse';

export async function getDestinations() {
  const response = await fetch(DESTINATIONS_API_URL);

  return handleResponse(response);
}

export async function getDestinationById(id) {
  const response = await fetch(`${DESTINATIONS_API_URL}/${id}`);
  return handleResponse(response);
}
