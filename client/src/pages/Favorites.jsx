import { useContext } from 'react';
import { FavContext } from '../context/FavoriteContext';
import travelData from '../data/travelData.json';
import DestinationCard from '../components/DestinationCard';
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
      <section className="min-h-screen">
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 overflow-x-auto pb-2.5">
          {favoriteDestinations.map((place) => (
            <DestinationCard key={place.name} place={place} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
