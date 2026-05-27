import { Link, useParams } from 'react-router-dom';
import { useTripDetails } from '../../hooks/useTripDetails';

export default function TripDetails() {
  const { tripId } = useParams();
  const { trip, isLoading, error } = useTripDetails(tripId);

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-white">Loading trip...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-red-600">{error}</p>

        <Link
          to="/trip"
          className="mt-4 inline-flex text-teal-400 hover:underline"
        >
          Back to trips
        </Link>
      </section>
    );
  }

  if (!trip) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <Link
        to="/trip"
        className="mb-6 inline-flex text-sm font-medium text-teal-400 hover:underline"
      >
        ← Back to trips
      </Link>

      <div className="mb-8 rounded-2xl bg-white/90 p-8 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-3xl font-bold text-slate-950">
          {trip.title}
        </h1>

        {trip.description && (
          <p className="mt-3 max-w-3xl text-slate-600">
            {trip.description}
          </p>
        )}

        <p className="mt-4 text-sm text-slate-500">
          {trip.items?.length ?? 0} destinations in this trip
        </p>
      </div>

      {trip.items?.length === 0 ? (
        <div className="rounded-2xl bg-white/90 p-8 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            No destinations yet.
          </h2>
          <p className="mt-2 text-slate-600">
            Later, you will be able to add destinations from packages,
            favorites, and destination pages.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trip.items.map((item) => {
            const destination = item.destination;

            if (!destination) return null;

            return (
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
                  <h2 className="text-lg font-bold text-slate-950">
                    {destination.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {destination.country}
                  </p>

                  <p className="mt-3 text-sm text-slate-600">
                    Priority: {item.priority}
                  </p>

                  {item.note && (
                    <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                      {item.note}
                    </p>
                  )}

                  <Link
                    to={`/destination/${destination._id}`}
                    className="mt-auto inline-flex self-start pt-4 text-sm font-medium text-blue-600 hover:underline"
                  >
                    View destination
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
