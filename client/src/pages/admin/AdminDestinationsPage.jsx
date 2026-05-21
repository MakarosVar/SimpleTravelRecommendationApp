import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAdminDestinations } from '../../services/adminService';
import PageContainer from '../../components/layout/PageContainer';
import { updateDestinationStatus } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();
  useEffect(() => {
    async function loadDestinations() {
      const data = await getAdminDestinations();
      setDestinations(data);
      setIsLoading(false);
    }

    loadDestinations();
  }, []);
  async function handleStatusToggle(destination) {
    const updatedDestination = await updateDestinationStatus(
      destination._id,
      !destination.isActive,
    );

    setDestinations((current) =>
      current.map((item) =>
        item._id === updatedDestination._id
          ? updatedDestination
          : item,
      ),
    );

    addToast(
      updatedDestination.isActive
        ? 'Destination reactivated'
        : 'Destination archived',
      'success',
    );
  }

  if (isLoading)
    return <p className="p-6">Loading destinations...</p>;

  return (
    <PageContainer>
      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
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

        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead className="bg-gray-50 text-sm text-gray-600">
              <tr>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Country</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold text-right">
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
                      onClick={() => handleStatusToggle(destination)}
                      className="ml-4 text-amber-600 hover:underline"
                    >
                      {destination.isActive === false
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
