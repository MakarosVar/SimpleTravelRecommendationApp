import { Link, useParams } from 'react-router-dom';
import { usePackageDetails } from '../../hooks/usePackageDetails.js';
import PageContainer from '../../components/layout/PageContainer.jsx';

export default function PackageDetails() {
  const { packageId } = useParams();
  const { packageItem, isLoading, error } =
    usePackageDetails(packageId);

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-white">Loading package...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-red-600">{error}</p>
        <Link
          to="/packages"
          className="mt-4 inline-flex text-teal-400 hover:underline"
        >
          Back to packages
        </Link>
      </section>
    );
  }

  if (!packageItem) {
    return null;
  }

  return (
    <PageContainer>
      <section className="mx-auto max-w-6xl px-6 py-10">
        <Link
          to="/packages"
          className="mb-6 inline-flex text-sm font-medium text-teal-400  hover:underline"
        >
          ← Back to packages
        </Link>

        <div className="mb-8 rounded-2xl bg-white/90 p-8 shadow-sm ring-1 ring-slate-200">
          <h1 className=" text-3xl font-bold text-slate-950">
            {packageItem.title}
          </h1>

          {packageItem.description && (
            <p className="mt-3 max-w-3xl text-slate-600">
              {packageItem.description}
            </p>
          )}

          <p className="mt-4 text-sm text-slate-500">
            {packageItem.destinations?.length ?? 0} destinations
            included
          </p>

          {/* Later this becomes: Create trip from package */}
          <button
            type="button"
            disabled
            className="mt-6 rounded-lg bg-slate-300 px-5 py-2 font-medium text-slate-600"
          >
            Create trip from package — coming soon
          </button>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold text-white underline">
            Included destinations
          </h2>

          {packageItem.destinations?.length === 0 ? (
            <p className="text-slate-600">
              This package has no destinations.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {packageItem.destinations.map((destination) => (
                <article
                  key={destination._id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"
                >
                  {destination.imageUrl && (
                    <img
                      src={destination.imageUrl}
                      alt={destination.name}
                      className="h-44 w-full object-cover"
                    />
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold text-slate-950">
                      {destination.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {destination.country}
                    </p>

                    {destination.description && (
                      <p className="mt-3 line-clamp-3 text-sm text-slate-600">
                        {destination.description}
                      </p>
                    )}

                    <Link
                      to={`/destinations/${destination._id}`}
                      className="mt-auto inline-flex self-start pt-4 text-sm font-medium text-blue-600 hover:underline"
                    >
                      View destination
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageContainer>
  );
}
