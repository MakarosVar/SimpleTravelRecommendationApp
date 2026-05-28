import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { FavContext } from '../../context/FavoriteContext';
import PageContainer from '../../components/layout/PageContainer';
import ErrorMessage from '../../components/shared/ErrorMessage';
import RetryButton from '../../components/shared/RetryButton';
import LoadingMessage from '../../components/shared/LoadingMessage';
import { useDestinationDetails } from '../../hooks/useDestinationDetails';
import { useAuth } from '../../context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../context/ToastContext';
import { addTripItem } from '../../services/user/tripService';
import { useTrips } from '../../hooks/useTrips';
import { AddToTravelPlanModal } from '../../components/trips/AddToTravelPlanModal';

export default function DestinationDetails() {
  const { id } = useParams();
  const destinationId = id;
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { destination, isLoading, error, reloadDestination } =
    useDestinationDetails(destinationId);
  const [isPlanPickerOpen, setIsPlanPickerOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState(null);
  const { toggleFavorite, isFavorite } = useContext(FavContext);
  const { isAuthenticated } = useAuth();
  const {
    trips,
    isLoading: isTripsLoading,
    error: TripError,
  } = useTrips({ enabled: isAuthenticated });
  function handleFavorite() {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    toggleFavorite(destination._id);
  }

  const addToTripPlanMutation = useMutation({
    mutationFn: (tripId) => addTripItem(tripId, destinationId),
    onSuccess: async (updatedTrip) => {
      await queryClient.invalidateQueries({ queryKey: ['trips'] });
      await queryClient.invalidateQueries({
        queryKey: ['trip', updatedTrip._id],
      });

      addToast('Destination added successfully', 'success');
      setSelectedTripId(null);
      setIsPlanPickerOpen(false);
    },
    onError: (error) => {
      addToast(
        error?.response?.data?.message ??
          'Could not add trip destination',
        'error',
      );
    },
  });
  function closeAddToTripModal() {
    setSelectedTripId(null);
    setIsPlanPickerOpen(false);
  }

  function handleAddToTripModal() {
    setIsPlanPickerOpen(true);
  }
  function handleSubmitAddToTrip(e) {
    e.preventDefault();
    if (!selectedTripId) return;
    addToTripPlanMutation.mutate(selectedTripId);
  }
  if (isLoading) {
    return (
      <PageContainer>
        <LoadingMessage message="Loading destination..." />
      </PageContainer>
    );
  }
  if (error) {
    return (
      <PageContainer>
        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-red-400/30 bg-red-500/10 px-6 py-4 text-center backdrop-blur-md">
          <ErrorMessage message={error} />
          <RetryButton onRetry={reloadDestination} />
        </div>
      </PageContainer>
    );
  }
  if (!destination) {
    return (
      <PageContainer>
        <div className="py-20 text-center text-white">
          Destination not found.
        </div>
      </PageContainer>
    );
  }

  const favorite = isFavorite(destination._id);

  return (
    <PageContainer>
      <div className="min-h-screen text-white">
        <section className="mx-auto relative max-w-5xl overflow-hidden rounded-3xl bg-black/50 shadow-2xl backdrop-blur">
          <div className="absolute left-6 right-6 top-6 z-10 flex items-start justify-between">
            <button
              className="rounded-full  bg-black/60  px-4 py-2  text-white  shadow-lg  backdrop-blur-md  border border-white/20"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
            <div className="flex gap-3">
              <button
                className="rounded-full  bg-teal-700/60  px-4 py-2 text-white  shadow-lg  backdrop-blur-md  border border-white/20"
                onClick={handleFavorite}
              >
                {favorite ? '♥ Saved' : '♡ Save'}
              </button>
              <button
                onClick={handleAddToTripModal}
                className={`rounded-full  shadow-lg  backdrop-blur-md 
                 border-white/20 border px-4 py-2 text-white transition
                  bg-teal-700 hover:bg-teal-600 ${!isAuthenticated ? 'hidden' : ''}`}
              >
                Add to travel plan
              </button>
            </div>
          </div>

          <img
            className="h-105 w-full object-cover"
            src={destination.imageUrl}
          ></img>
          <div className="space-y-6 p-8">
            <h1 className="text-4xl font-bold md:text-5xl">
              {destination.name}
            </h1>
            <h2 className="text-lg text-teal-300">
              {destination.country} • {destination.type}
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-gray-200">
              {destination.description}
            </p>
            <ul className="flex flex-wrap gap-3">
              {destination.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-teal-500/20 px-4 py-2 text-sm font-medium text-teal-200"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      <AddToTravelPlanModal
        isOpen={isPlanPickerOpen}
        onClose={closeAddToTripModal}
        trips={trips}
        isTripsLoading={isTripsLoading}
        isTripsError={Boolean(TripError)}
        selectedTripId={selectedTripId}
        onSelectTrip={setSelectedTripId}
        onSubmit={handleSubmitAddToTrip}
        isPending={addToTripPlanMutation.isPending}
        destinationId={destination._id}
      />
    </PageContainer>
  );
}
