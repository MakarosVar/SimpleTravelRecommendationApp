import apiClient from '../apiClient';

export async function getDestinations(params = {}) {
  const response = await apiClient.get('/destinations', { params });

  return response.data;
}

export async function getDestinationById(id) {
  const response = await apiClient.get(`/destinations/${id}`);

  return response.data;
}
