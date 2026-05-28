import { Link } from 'react-router-dom';
import { usePackages } from '../../hooks/usePackages.js';
import PageContainer from '../../components/layout/PageContainer.jsx';

export default function Packages() {
  const { packages, isLoading, error } = usePackages();

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-white">Loading packages...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <PageContainer>
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Curated Travel Packages
          </h1>
          <p className="mt-2 max-w-2xl text-white">
            Explore curated travel experiences built from hand-picked
            destinations.
          </p>
        </div>

        {packages.length === 0 ? (
          <div className="rounded-2xl bg-white/90 p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              No packages available yet.
            </h2>
            <p className="mt-2 text-slate-600">
              Published travel packages will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((packageItem) => (
              <article
                key={packageItem._id}
                className="flex flex-col rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-bold text-slate-950">
                    {packageItem.title}
                  </h2>

                  {(packageItem.travelStyle ||
                    packageItem.duration) && (
                    <p className="mb-2 text-sm font-semibold text-teal-600">
                      {packageItem?.travelStyle} •{' '}
                      {packageItem?.duration}
                    </p>
                  )}
                  {packageItem.description && (
                    <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                      {packageItem.description}
                    </p>
                  )}

                  <div className="mt-4 text-sm text-slate-500">
                    {packageItem.destinations?.length ?? 0}{' '}
                    destinations
                  </div>

                  {packageItem.destinations?.length > 0 && (
                    <ul className="mt-3 space-y-1 text-sm text-slate-600">
                      {packageItem.destinations
                        .slice(0, 3)
                        .map((destination) => (
                          <li key={destination._id}>
                            • {destination.name}
                          </li>
                        ))}

                      {packageItem.destinations.length > 3 && (
                        <li className="text-slate-400">
                          +{packageItem.destinations.length - 3} more
                        </li>
                      )}
                    </ul>
                  )}

                  <div className="mt-6">
                    <Link
                      to={`/packages/${packageItem._id}`}
                      className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      View package
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </PageContainer>
  );
}
