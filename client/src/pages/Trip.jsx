import { useContext } from 'react';
import travelData from '../data/travelData.json';
import DestinationCard from '../components/destination/DestinationCard';
import PageContainer from '../components/layout/PageContainer';
import { TripContext } from '../context/TripContext';

export default function Trip() {
  const { tripItems } = useContext(TripContext);

  const tripDestinations = travelData.destinations.filter(
    (destination) => tripItems.includes(destination.id),
  );
  if (tripDestinations.length === 0) {
    return (
      <div className="min-h-screen pt-32 text-center text-white">
        No Trip destinations yet.
      </div>
    );
  }
  return (
    <PageContainer>
      <section className="min-h-screen">
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2  gap-5 overflow-x-auto pb-2.5">
          {tripDestinations.map((place) => (
            <DestinationCard key={place.name} place={place} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
