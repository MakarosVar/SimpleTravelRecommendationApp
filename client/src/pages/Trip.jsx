import { useContext } from 'react';
import { useDestinations } from '../hooks/useDestinations';
import PageContainer from '../components/layout/PageContainer';
import { TripContext } from '../context/TripContext';
import TripItemCard from '../components/destination/TripItemCard';
import LoadingMessage from '../components/shared/LoadingMessage';
import ErrorMessage from '../components/shared/ErrorMessage';
import RetryButton from '../components/shared/RetryButton';

export default function Trip() {
  const { destinations, isLoading, error, reloadDestinations } =
    useDestinations();
  const { trip, updateTripItem, removeFromTrip } =
    useContext(TripContext);

  const tripItems = trip
    .map((tripItem) => {
      const destination = destinations.find(
        (destination) => destination.id === tripItem.destinationId,
      );

      return {
        ...tripItem,
        destination,
      };
    })
    .filter((tripItem) => tripItem.destination);
  if (!isLoading && !error && tripItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 text-center text-white">
        No Trip destinations yet.
      </div>
    );
  }
  return (
    <PageContainer>
      <section className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10">
        {isLoading && (
          <LoadingMessage message="Loading trip destinations..." />
        )}

        {error && (
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-red-400/30 bg-red-500/10 px-6 py-4 text-center backdrop-blur-md">
            <ErrorMessage message={error} />
            <RetryButton onRetry={reloadDestinations} />
          </div>
        )}
        {!isLoading && !error && (
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {tripItems.map((item) => (
              <TripItemCard
                key={item.destinationId}
                item={item}
                onUpdate={updateTripItem}
                onRemove={removeFromTrip}
              />
            ))}
          </div>
        )}
      </section>
    </PageContainer>
  );
}
