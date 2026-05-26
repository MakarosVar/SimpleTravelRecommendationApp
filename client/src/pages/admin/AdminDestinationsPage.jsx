import { Link } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import {
  getAdminDestinations,
  updateDestinationStatus,
} from '../../services/admin/adminDestinationService';
import { useToast } from '../../context/ToastContext';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export default function AdminDestinationsPage() {
  const {
    data: destinations = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ['adminDestinations'],
    queryFn: getAdminDestinations,
  });
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  function handleStatusToggle(destination) {
    statusMutation.mutate({
      destinationId: destination._id,
      isActive: !destination.isActive,
    });
  }
  const statusMutation = useMutation({
    mutationFn: ({ destinationId, isActive }) =>
      updateDestinationStatus(destinationId, isActive),

    onSuccess: async (updatedDestination) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['adminDestinations'],
        }),
        queryClient.invalidateQueries({ queryKey: ['destinations'] }),
      ]);

      addToast(
        updatedDestination.isActive
          ? 'Destination reactivated'
          : 'Destination archived',
        'success',
      );
    },

    onError: () => {
      addToast('Could not update destination status', 'error');
    },
  });

  if (isPending)
    return <p className="p-6">Loading destinations...</p>;
  if (isError) {
    return (
      <p className="px-6 py-8 text-white">
        Could not load destinations.
      </p>
    );
  }

  return (
    <PageContainer>
      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="sticky top-18 z-20 mb-6 flex items-center justify-between px-6 py-4 backdrop-blur">
          <div>
            <h1 className="text-3xl font-bold">Destinations</h1>
            <p className="mt-1 text-white">
              Manage destination content shown across TravelBloom.
            </p>
          </div>

          <Link
            to="/admin/destinations/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            + Create Destination
          </Link>
        </div>

        <div className="max-h-[calc(100vh-280px)] overflow-auto rounded-xl border bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead className="bg-gray-50 text-sm text-gray-600">
              <tr>
                <th className="sticky top-0 z-10 bg-gray-50 px-3 py-3 font-semibold">
                  Status
                </th>
                <th className="sticky top-0 z-10 bg-gray-50 px-5 py-3 font-semibold">
                  Name
                </th>
                <th className="sticky top-0 z-10 bg-gray-50 px-5 py-3 font-semibold">
                  Country
                </th>
                <th className="sticky top-0 z-10 bg-gray-50 px-5 py-3 font-semibold">
                  Type
                </th>
                <th className="sticky top-0 z-10 bg-gray-50 px-5 py-3 font-semibold text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {destinations.map((destination) => (
                <tr
                  key={destination._id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-3 py-4 font-medium">
                    {destination.isActive ? (
                      <div className="text-green-400 text-sm font-medium">
                        Active
                      </div>
                    ) : (
                      <div className="text-orange-300">Archived</div>
                    )}
                  </td>
                  <td className="px-5 py-4 font-medium">
                    {destination.name}
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {destination.country}
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {destination.type}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      to={`/admin/destinations/${destination._id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      disabled={statusMutation.isPending}
                      onClick={() => handleStatusToggle(destination)}
                      className="ml-4 text-amber-600 hover:underline disabled:opacity-50"
                    >
                      {!destination.isActive
                        ? 'Reactivate'
                        : 'Archive'}
                    </button>
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
