import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTrips } from '../../hooks/useTrips';
import { useDestinations } from '../../hooks/useDestinations';
import { createTrip } from '../../services/user/tripService';
import { useToast } from '../../context/ToastContext';
import PageContainer from '../../components/layout/PageContainer';
import { deleteTrip } from '../../services/user/tripService';

export default function Trip() {
  const { trips, isLoading, error } = useTrips();
  const {
    destinations,
    isLoading: isDestinationsLoading,
    error: destinationsError,
  } = useDestinations();

  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTripForm, setNewTripForm] = useState({
    title: '',
    description: '',
  });
  const [selectedDestinationIds, setSelectedDestinationIds] =
    useState([]);
  const [destinationSearch, setDestinationSearch] = useState('');

  const filteredDestinations = useMemo(() => {
    const search = destinationSearch.trim().toLowerCase();

    if (!search) return destinations;

    return destinations.filter((destination) => {
      return (
        destination.name?.toLowerCase().includes(search) ||
        destination.country?.toLowerCase().includes(search) ||
        destination.type?.toLowerCase().includes(search)
      );
    });
  }, [destinations, destinationSearch]);

  const createTripMutation = useMutation({
    mutationFn: (payload) => createTrip(payload),

    onSuccess: async (createdTrip) => {
      await queryClient.invalidateQueries({ queryKey: ['trips'] });

      addToast('Trip created successfully', 'success');
      closeCreateModal();

      navigate(`/trip/${createdTrip._id}`);
    },

    onError: (error) => {
      addToast(
        error?.response?.data?.message ?? 'Could not create trip',
        'error',
      );
    },
  });
  const deleteTripMutation = useMutation({
    mutationFn: (tripId) => deleteTrip(tripId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['trips'] });
      addToast('Trip deleted successfully', 'success');
    },

    onError: (error) => {
      addToast(
        error?.response?.data?.message ?? 'Could not delete trip',
        'error',
      );
    },
  });
  function handleDeleteTrip(tripId) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this trip?',
    );

    if (!confirmed) return;

    deleteTripMutation.mutate(tripId);
  }

  function resetCreateTripForm() {
    setNewTripForm({
      title: '',
      description: '',
    });
    setSelectedDestinationIds([]);
    setDestinationSearch('');
  }

  function openCreateModal() {
    setIsCreateModalOpen(true);
  }

  function closeCreateModal() {
    setIsCreateModalOpen(false);
    resetCreateTripForm();
  }

  function handleToggleDestination(destinationId) {
    setSelectedDestinationIds((current) =>
      current.includes(destinationId)
        ? current.filter((id) => id !== destinationId)
        : [...current, destinationId],
    );
  }

  function handleCreateTrip(e) {
    e.preventDefault();

    const title = newTripForm.title.trim();

    if (!title) {
      addToast('Trip title is required', 'error');
      return;
    }

    if (selectedDestinationIds.length === 0) {
      addToast('Select at least one destination', 'error');
      return;
    }

    createTripMutation.mutate({
      title,
      description: newTripForm.description.trim(),
      destinationIds: selectedDestinationIds,
    });
  }

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
            onClick={openCreateModal}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            + New Trip
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
                className="flex min-h-60 flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
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

                <div className="mt-auto flex gap-3 pt-6">
                  <Link
                    to={`/trip/${trip._id}`}
                    className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    View trip
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDeleteTrip(trip._id)}
                    disabled={deleteTripMutation.isPending}
                    className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="border-b px-6 py-5">
              <h2 className="text-2xl font-bold text-slate-950">
                Create new trip
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Start a travel plan by choosing at least one
                destination.
              </p>
            </div>

            <form
              onSubmit={handleCreateTrip}
              className="flex max-h-[75vh] flex-col"
            >
              <div className="space-y-5 overflow-y-auto px-6 py-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Trip title
                  </label>

                  <input
                    value={newTripForm.title}
                    onChange={(e) =>
                      setNewTripForm((current) => ({
                        ...current,
                        title: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    placeholder="e.g. Greece Summer Plan"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Description
                  </label>

                  <textarea
                    value={newTripForm.description}
                    onChange={(e) =>
                      setNewTripForm((current) => ({
                        ...current,
                        description: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    placeholder="Optional notes about this trip..."
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label className="block text-sm font-medium text-slate-700">
                      Destinations
                    </label>

                    <span className="text-xs text-slate-500">
                      {selectedDestinationIds.length} selected
                    </span>
                  </div>

                  <input
                    value={destinationSearch}
                    onChange={(e) =>
                      setDestinationSearch(e.target.value)
                    }
                    className="mb-3 w-full rounded-lg border border-slate-300 px-3 py-2"
                    placeholder="Search destinations..."
                  />

                  {isDestinationsLoading ? (
                    <p className="text-sm text-slate-500">
                      Loading destinations...
                    </p>
                  ) : destinationsError ? (
                    <p className="text-sm text-red-600">
                      {destinationsError}
                    </p>
                  ) : (
                    <div className="max-h-64 space-y-2 overflow-y-auto rounded-xl border border-slate-200 p-3">
                      {filteredDestinations.length === 0 ? (
                        <p className="text-sm text-slate-500">
                          No destinations found.
                        </p>
                      ) : (
                        filteredDestinations.map((destination) => {
                          const isSelected =
                            selectedDestinationIds.includes(
                              destination._id,
                            );

                          return (
                            <button
                              key={destination._id}
                              type="button"
                              onClick={() =>
                                handleToggleDestination(
                                  destination._id,
                                )
                              }
                              className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition ${
                                isSelected
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-slate-200 bg-white hover:bg-slate-50'
                              }`}
                            >
                              <div>
                                <p className="font-medium text-slate-900">
                                  {destination.name}
                                </p>

                                <p className="text-sm text-slate-500">
                                  {destination.country}
                                  {destination.type
                                    ? ` · ${destination.type}`
                                    : ''}
                                </p>
                              </div>

                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                  isSelected
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {isSelected ? 'Selected' : 'Add'}
                              </span>
                            </button>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t bg-slate-50 px-6 py-4">
                <button
                  type="button"
                  onClick={closeCreateModal}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={createTripMutation.isPending}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {createTripMutation.isPending
                    ? 'Creating...'
                    : 'Create trip'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
