import { useContext } from 'react';
import { FavContext } from '../context/FavoriteContext';
import travelData from '../data/travelData.json';
import DestinationCard from '../components/destination/DestinationCard';
import PageContainer from '../components/layout/PageContainer';

export default function Favorites() {
  const { favorites } = useContext(FavContext);
  const favoriteDestinations = travelData.destinations.filter(
    (destination) => favorites.includes(destination.id),
  );
  if (favoriteDestinations.length === 0) {
    return (
      <div className="min-h-screen pt-32 text-center text-white">
        No favorite destinations yet.
      </div>
    );
  }
  return (
    <PageContainer>
      <section className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {favoriteDestinations.map((place) => (
            <DestinationCard key={place.name} place={place} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
