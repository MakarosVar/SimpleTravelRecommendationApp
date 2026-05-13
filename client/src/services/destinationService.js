import travelData from '../data/travelData.json';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getDestinations() {
  await delay(1500);

  return travelData.destinations;
}
