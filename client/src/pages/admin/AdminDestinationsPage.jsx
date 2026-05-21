import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAdminDestinations } from '../../services/adminService';
import PageContainer from '../../components/layout/PageContainer';

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDestinations() {
      const data = await getAdminDestinations();
      setDestinations(data);
      setIsLoading(false);
    }

    loadDestinations();
  }, []);

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
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button className="ml-4 text-red-600 hover:underline">
                      Delete
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
