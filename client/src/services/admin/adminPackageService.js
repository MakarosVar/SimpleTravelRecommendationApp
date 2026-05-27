import apiClient from '../apiClient';

export async function getAllAdminPackages() {
  const response = await apiClient.get('/admin/packages');
  return response.data;
}

export async function getAdminPackage(packageId) {
  const response = await apiClient.get(
    `/admin/packages/${packageId}`,
  );
  return response.data;
}

export async function updateAdminPackage(packageId, packageItem) {
  const response = await apiClient.patch(
    `/admin/packages/${packageId}`,
    packageItem,
  );
  return response.data;
}

export async function createAdminPackage(packageItem) {
  const response = await apiClient.post(
    '/admin/packages',
    packageItem,
  );
  return response.data;
}
export async function updateAdminPackageStatus(packageId, status) {
  const { data } = await apiClient.patch(
    `/admin/packages/${packageId}/status`,
    { status },
  );

  return data;
}
