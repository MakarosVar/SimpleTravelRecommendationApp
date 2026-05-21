import { Link } from 'react-router-dom';

export default function AdminDashboardPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Manage TravelBloom platform content.
      </p>

      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Destinations</h2>
        <p className="mt-2 text-gray-600">
          Create, edit, and manage travel destinations shown to users.
        </p>

        <div className="mt-5 flex gap-3">
          <Link
            to="/admin/destinations"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Manage Destinations
          </Link>

          <Link
            to="/admin/destinations/new"
            className="rounded-lg border px-4 py-2 hover:bg-gray-50"
          >
            Create Destination
          </Link>
        </div>
      </div>
    </section>
  );
}
