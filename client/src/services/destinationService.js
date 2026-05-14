import travelData from '../data/travelData.json';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getDestinations() {
  await delay(500);

  return travelData.destinations;
}
export async function getDestinationById(id) {
  await delay(500);

  return travelData.destinations.find(
    (destination) => destination.id === id,
  );
}
