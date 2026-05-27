import apiClient from '../apiClient';

export async function getPackages() {
  const { data } = await apiClient.get('/packages');
  return data;
}

export async function getPackageById(packageId) {
  const { data } = await apiClient.get(`/packages/${packageId}`);
  return data;
}
