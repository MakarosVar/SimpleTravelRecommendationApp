import { useContext } from 'react';
import { FavContext } from '../context/FavoriteContext';
import { useDestinations } from '../hooks/useDestinations';
import DestinationCard from '../components/destination/DestinationCard';
import PageContainer from '../components/layout/PageContainer';

export default function Favorites() {
  const { favorites } = useContext(FavContext);
  const { destinations, isLoading, error } = useDestinations();
  const favoriteDestinations = destinations.filter((destination) =>
    favorites.includes(destination.id),
  );
  if (!isLoading && !error && favoriteDestinations.length === 0) {
    return (
      <div className="min-h-screen pt-32 text-center text-white">
        No favorite destinations yet.
      </div>
    );
  }
  return (
    <PageContainer>
      <section className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10">
        {isLoading && (
          <div className="py-20 text-center text-white">
            Loading favorite destinations...
          </div>
        )}

        {error && (
          <div className="py-20 text-center text-red-200">
            {error}
          </div>
        )}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {favoriteDestinations.map((place) => (
              <DestinationCard key={place.id} place={place} />
            ))}
          </div>
        )}
      </section>
    </PageContainer>
  );
}
