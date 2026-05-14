import travelData from '../data/travelData.json';

const tripItems = [];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getDestinations() {
  await delay(1500);

  return travelData.destinations;
}
export async function getDestinationById(id) {
  await delay(1500);

  return travelData.destinations.find(
    (destination) => destination.id === id,
  );
}
export async function getUserTrips() {
  return tripItems;
}
export async function saveTripItem(destinationId, updates) {
  tripItems.map((item) =>
    item.destinationId === destinationId
      ? { ...item, ...updates }
      : item,
  );
}
