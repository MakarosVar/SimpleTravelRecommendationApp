import PageContainer from '../components/layout/PageContainer';
import TripItemCard from '../components/destination/TripItemCard';
import LoadingMessage from '../components/shared/LoadingMessage';
import ErrorMessage from '../components/shared/ErrorMessage';
import RetryButton from '../components/shared/RetryButton';
import useTripPageData from '../hooks/useTripPageData';

export default function Trip() {
  const {
    tripItems,
    isPageLoading,
    pageError,
    retry,
    updateTripItem,
    removeFromTrip,
  } = useTripPageData();
  if (!isPageLoading && !pageError && tripItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 text-center text-white">
        No Trip destinations yet.
      </div>
    );
  }
  return (
    <PageContainer>
      <section className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10">
        {isPageLoading && (
          <LoadingMessage message="Loading trip..." />
        )}
        {pageError && (
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-red-400/30 bg-red-500/10 px-6 py-4 text-center backdrop-blur-md">
            <ErrorMessage message={pageError} />

            <RetryButton onRetry={retry} />
          </div>
        )}
        {!isPageLoading && !pageError && (
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
