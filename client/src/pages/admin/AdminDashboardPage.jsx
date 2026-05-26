import { Link } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';

export default function AdminDashboardPage() {
  return (
    <PageContainer>
      <section className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-white">
          Manage TravelBloom platform content.
        </p>

        <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Destinations</h2>
          <p className="mt-2 text-gray-600">
            Create, edit, and manage travel operations across
            Travelbloom.
          </p>

          <div className="mt-5 flex gap-3">
            <Link
              to="/admin/destinations"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Manage Destinations
            </Link>
            <Link
              to="/admin/packages"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Manage Packages
            </Link>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
