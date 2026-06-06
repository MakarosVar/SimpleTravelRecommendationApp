import apiClient from '../apiClient';

export async function getPackages(params = {}) {
  const { data } = await apiClient.get('/packages', { params });
  return data;
}

export async function getPackageById(packageId) {
  const { data } = await apiClient.get(`/packages/${packageId}`);
  return data;
}
