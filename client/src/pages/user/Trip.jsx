import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTrips } from '../../hooks/useTrips';
import { createTrip } from '../../services/user/tripService';
import { useToast } from '../../context/ToastContext';
import PageContainer from '../../components/layout/PageContainer';

export default function Trip() {
  const { trips, isLoading, error } = useTrips();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const createTripMutation = useMutation({
    mutationFn: () =>
      createTrip({
        title: 'My Travel Plan',
        description: '',
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['trips'] });
      addToast('Trip created successfully', 'success');
    },

    onError: () => {
      addToast('Could not create trip', 'error');
    },
  });

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-white">Loading trips...</p>
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
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              My Trips
            </h1>
            <p className="mt-2 text-white">
              Manage your personal travel plans.
            </p>
          </div>

          <button
            type="button"
            onClick={() => createTripMutation.mutate()}
            disabled={createTripMutation.isPending}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {createTripMutation.isPending
              ? 'Creating...'
              : '+ New Trip'}
          </button>
        </div>

        {trips.length === 0 ? (
          <div className="rounded-2xl bg-white/90 p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">
              No trips yet.
            </h2>
            <p className="mt-2 text-slate-600">
              Create your first travel plan and start adding
              destinations.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <article
                key={trip._id}
                className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <h2 className="text-xl font-bold text-slate-950">
                  {trip.title}
                </h2>

                {trip.description && (
                  <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                    {trip.description}
                  </p>
                )}

                <p className="mt-4 text-sm text-slate-500">
                  {trip.items?.length ?? 0} destinations
                </p>

                <Link
                  to={`/trip/${trip._id}`}
                  className="mt-6 inline-flex self-start rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  View trip
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </PageContainer>
  );
}
