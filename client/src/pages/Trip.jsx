import { useContext } from 'react';
import travelData from '../data/travelData.json';
import PageContainer from '../components/layout/PageContainer';
import { TripContext } from '../context/TripContext';
import TripItemCard from '../components/destination/TripItemCard';

export default function Trip() {
  const { trip, updateTripItem, removeFromTrip } =
    useContext(TripContext);

  const tripItems = trip
    .map((tripItem) => {
      const destination = travelData.destinations.find(
        (destination) => destination.id === tripItem.destinationId,
      );

      return {
        ...tripItem,
        destination,
      };
    })
    .filter((tripItem) => tripItem.destination);
  if (tripItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 text-center text-white">
        No Trip destinations yet.
      </div>
    );
  }
  return (
    <PageContainer>
      <section className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10">
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {tripItems.map((item) => (
            <TripItemCard
              item={item}
              onUpdate={updateTripItem}
              onRemove={removeFromTrip}
            />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
