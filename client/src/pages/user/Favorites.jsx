import DestinationCard from '../../components/cards/DestinationCard';
import PageContainer from '../../components/layout/PageContainer';
import LoadingMessage from '../../components/shared/LoadingMessage';
import ErrorMessage from '../../components/shared/ErrorMessage';
import RetryButton from '../../components/shared/RetryButton';
import { useFavorites } from '../../hooks/useFavorites';

export default function Favorites() {
  const {
    favorites,
    isLoadingFavorites,
    favoritesError,
    reloadFavorites,
  } = useFavorites();
  if (
    !isLoadingFavorites &&
    !favoritesError &&
    favorites.length === 0
  ) {
    return (
      <div className="min-h-screen pt-32 text-center text-white">
        No favorite destinations yet.
      </div>
    );
  }
  return (
    <PageContainer>
      <section className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10">
        {isLoadingFavorites && (
          <LoadingMessage message="Loading favorite destinations..." />
        )}

        {favoritesError && (
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-red-400/30 bg-red-500/10 px-6 py-4 text-center backdrop-blur-md">
            <ErrorMessage message={favoritesError} />
            <RetryButton onRetry={reloadFavorites} />
          </div>
        )}
        {!isLoadingFavorites && !favoritesError && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {favorites.map((place) => (
              <DestinationCard key={place._id} place={place} />
            ))}
          </div>
        )}
      </section>
    </PageContainer>
  );
}
