const TRIP_STORAGE_KEY = 'travelBloomTrip';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getTripItems() {
  await delay(500);

  const storedTrip = localStorage.getItem(TRIP_STORAGE_KEY);

  return storedTrip ? JSON.parse(storedTrip) : [];
}

export async function saveTripItems(tripItems) {
  await delay(500);

  localStorage.setItem(TRIP_STORAGE_KEY, JSON.stringify(tripItems));

  return tripItems;
}
