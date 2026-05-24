import PageContainer from '../../components/layout/PageContainer';
import TripItemCard from '../../components/destination/TripItemCard';
import LoadingMessage from '../../components/shared/LoadingMessage';
import ErrorMessage from '../../components/shared/ErrorMessage';
import RetryButton from '../../components/shared/RetryButton';
import { useContext } from 'react';
import { TripContext } from '../../context/TripContext';

export default function Trip() {
  const {
    trip,
    isLoadingTrip,
    tripError,
    reloadTrip,
    updateTripItem,
    toggleTripItem,
  } = useContext(TripContext);
  if (!isLoadingTrip && !tripError && trip.length === 0) {
    return (
      <div className="min-h-screen pt-32 text-center text-white">
        No Trip destinations yet.
      </div>
    );
  }
  return (
    <PageContainer>
      <section className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10">
        {isLoadingTrip && (
          <LoadingMessage message="Loading trip..." />
        )}
        {tripError && (
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-red-400/30 bg-red-500/10 px-6 py-4 text-center backdrop-blur-md">
            <ErrorMessage message={tripError} />

            <RetryButton onRetry={reloadTrip} />
          </div>
        )}
        {!isLoadingTrip && !tripError && (
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {trip.map((item) => (
              <TripItemCard
                key={item.destinationId}
                item={item}
                onUpdate={updateTripItem}
                onRemove={toggleTripItem}
              />
            ))}
          </div>
        )}
      </section>
    </PageContainer>
  );
}
