import { Link, useParams } from 'react-router-dom';
import { useTripDetails } from '../../hooks/useTripDetails';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteTripItem,
  updateTrip,
  updateTripItem,
} from '../../services/user/tripService';
import { useToast } from '../../context/ToastContext';
import TripItemCard from '../../components/cards/TripItemCard';
import { useEffect, useState } from 'react';
import TripItemEditModal from '../../components/trips/TripItemEditModal';
import PageContainer from '../../components/layout/PageContainer';

export default function TripDetails() {
  const [isEditingTrip, setIsEditingTrip] = useState(false);
  const [tripForm, setTripForm] = useState({
    title: '',
    description: '',
  });
  const [editingItem, setEditingItem] = useState(null);
  const { tripId } = useParams();
  const { trip, isLoading, error } = useTripDetails(tripId);
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const updateTripMutation = useMutation({
    mutationFn: (payload) => updateTrip(tripId, payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['trip', tripId],
      });
      await queryClient.invalidateQueries({ queryKey: ['trips'] });

      setIsEditingTrip(false);
      addToast('Trip updated successfully', 'success');
    },

    onError: (error) => {
      addToast(
        error?.response?.data?.message ?? 'Could not update trip',
        'error',
      );
    },
  });
  const removeItemMutation = useMutation({
    mutationFn: (destinationId) =>
      deleteTripItem(tripId, destinationId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['trip', tripId],
      });

      await queryClient.invalidateQueries({
        queryKey: ['trips'],
      });

      addToast('Destination removed from trip', 'success');
    },

    onError: (error) => {
      addToast(
        error?.response?.data?.message ??
          'Could not remove destination',
        'error',
      );
    },
  });
  const updateItemMutation = useMutation({
    mutationFn: ({ destinationId, updates }) =>
      updateTripItem(tripId, destinationId, updates),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['trip', tripId],
      });

      await queryClient.invalidateQueries({
        queryKey: ['trips'],
      });

      setEditingItem(null);
      addToast('Trip Destination updated.', 'success');
    },

    onError: (error) => {
      addToast(
        error?.response?.data?.message ??
          'Could not remove destination',
        'error',
      );
    },
  });
  function handleRemoveTripItem(destinationId) {
    removeItemMutation.mutate(destinationId);
  }

  function handleUpdateTrip(e) {
    e.preventDefault();

    const title = tripForm.title.trim();

    if (!title) {
      addToast('Trip title is required', 'error');
      return;
    }

    updateTripMutation.mutate({
      title,
      description: tripForm.description.trim(),
    });
  }
  function handleEditTripItem(item) {
    setEditingItem(item);
  }
  function handleSaveTripItem(destinationId, updates) {
    updateItemMutation.mutate({
      destinationId,
      updates,
    });
  }
  useEffect(() => {
    if (trip) {
      setTripForm({
        title: trip.title ?? '',
        description: trip.description ?? '',
      });
    }
  }, [trip]);

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
    <PageContainer>
      <section className="mx-auto max-w-6xl px-6 py-10">
        <Link
          to="/trip"
          className="mb-6 inline-flex text-sm font-medium text-teal-400 hover:underline"
        >
          ← Back to trips
        </Link>

        <div className="relative mb-8 rounded-2xl bg-white/90 p-8 shadow-sm ring-1 ring-slate-200">
          {isEditingTrip ? (
            <form onSubmit={handleUpdateTrip} className="space-y-4">
              <input
                value={tripForm.title}
                onChange={(e) =>
                  setTripForm((current) => ({
                    ...current,
                    title: e.target.value,
                  }))
                }
                className="w-full rounded-lg border px-3 py-2 text-slate-950"
                required
              />

              <textarea
                value={tripForm.description}
                onChange={(e) =>
                  setTripForm((current) => ({
                    ...current,
                    description: e.target.value,
                  }))
                }
                rows={3}
                className="w-full rounded-lg border px-3 py-2 text-slate-950"
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={updateTripMutation.isPending}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-60"
                >
                  {updateTripMutation.isPending
                    ? 'Saving...'
                    : 'Save'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsEditingTrip(false);
                    setTripForm({
                      title: trip.title ?? '',
                      description: trip.description ?? '',
                    });
                  }}
                  className="rounded-lg border px-4 py-2 text-slate-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              {trip.sourcePackage && (
                <p
                  className="absolute top-5 right-5 hidden md:inline-flex w-fit rounded-full px-3 py-1 text-xs text-slate-500 bg-slate-100
                 border-slate-200"
                >{`Based on package:${trip.sourcePackage.title}`}</p>
              )}
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

              <button
                type="button"
                onClick={() => setIsEditingTrip(true)}
                className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Edit trip
              </button>
            </>
          )}
        </div>
        {trip.items?.length === 0 ? (
          <div className="rounded-2xl bg-white/90 p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">
              No destinations yet.
            </h2>
            <p className="mt-2 text-slate-600">
              You can add destinations from packages, favorites, and
              destination pages.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trip.items.map((item) => {
              const destination = item.destination;

              if (!destination) return null;

              return (
                <TripItemCard
                  key={destination._id}
                  item={item}
                  onEdit={handleEditTripItem}
                  onRemove={handleRemoveTripItem}
                />
              );
            })}
          </div>
        )}
        {editingItem && (
          <TripItemEditModal
            item={editingItem}
            isSaving={updateItemMutation.isPending}
            onClose={() => setEditingItem(null)}
            onSave={handleSaveTripItem}
          />
        )}
      </section>
    </PageContainer>
  );
}
