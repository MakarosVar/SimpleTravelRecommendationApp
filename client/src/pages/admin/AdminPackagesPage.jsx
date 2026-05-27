import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import PageContainer from '../../components/layout/PageContainer';
import {
  getAllAdminPackages,
  updateAdminPackageStatus,
} from '../../services/admin/adminPackageService';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

export default function AdminPackagesPage() {
  const {
    data: packageItems = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ['adminPackages'],
    queryFn: getAllAdminPackages,
  });
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const updateStatusMutation = useMutation({
    mutationFn: ({ packageId, status }) =>
      updateAdminPackageStatus(packageId, status),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPackages'] });
      addToast('Package status updated', 'success');
    },

    onError: (error) => {
      addToast(
        error?.response?.data?.message ??
          'Could not update package status',
        'error',
      );
    },
  });

  if (isPending) return <p className="p-6">Loading packages...</p>;
  if (isError) {
    return (
      <p className="px-6 py-8 text-white">Could not load packages.</p>
    );
  }
  return (
    <PageContainer>
      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Packages</h1>
            <p className="mt-1 text-white">
              Manage package content shown across TravelBloom.
            </p>
          </div>
          <Link
            to="/admin/packages/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            + Create Package
          </Link>
        </div>
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead className="bg-gray-50 text-sm text-gray-600">
              <tr>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Title</th>
                <th className="px-5 py-3 font-semibold">
                  Destinations Count
                </th>
                <th className="px-5 py-3 font-semibold text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {packageItems.map((packageItem) => (
                <tr
                  key={packageItem._id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-3 py-4 font-medium">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                        packageItem.status === 'published'
                          ? 'bg-green-200 text-green-700'
                          : 'bg-yellow-200 text-yellow-700'
                      }`}
                    >
                      {packageItem.status}
                    </span>
                  </td>

                  <td className="px-3 py-4 font-medium">
                    <div className="font-semibold">
                      {packageItem.title}
                    </div>

                    {packageItem.description && (
                      <div className="mt-1 max-w-xl truncate text-sm text-gray-500">
                        {packageItem.description}
                      </div>
                    )}
                  </td>

                  <td className="px-3 py-4 font-medium">
                    {packageItem.destinations?.length ?? 0}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      disabled={updateStatusMutation.isPending}
                      type="button"
                      className={`${packageItem.status === 'published' ? 'text-amber-600' : 'text-green-500'} mr-4 hover:underline disabled:opacity-50`}
                      onClick={() =>
                        updateStatusMutation.mutate({
                          packageId: packageItem._id,
                          status:
                            packageItem.status === 'published'
                              ? 'draft'
                              : 'published',
                        })
                      }
                    >
                      {packageItem.status === 'published'
                        ? 'Unpublish'
                        : 'Publish'}
                    </button>
                    <Link
                      to={`/admin/packages/${packageItem._id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageContainer>
  );
}
