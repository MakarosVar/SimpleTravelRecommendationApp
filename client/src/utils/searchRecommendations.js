import { matchesText } from './searchHelpers';
export function searchRecommendations(
  travelData,
  searchTerm,
  selectedType = 'all',
) {
  const input = searchTerm.toLowerCase().trim();

  if (!input) {
    return [];
  }
  const searchableFields = ['name', 'country', 'type'];

  let results = travelData.destinations.filter((destination) => {
    const matchesType =
      selectedType === 'all' || destination.type === selectedType;
    const matchesFields = searchableFields.some((field) =>
      matchesText(destination[field], input),
    );

    const matchesTags = destination.tags.some((tag) =>
      matchesText(tag, input),
    );

    return (matchesFields || matchesTags) && matchesType;
  });
  const uniqueResults = removeDuplicates(results);
  const shuffledResults = shuffleArray(uniqueResults);

  return shuffledResults.slice(0, 2);
}

function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // const temp = shuffled[i];
    // shuffled[i] = shuffled[randomIndex];
    // shuffled[randomIndex] = temp;
    [shuffled[i], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[i],
    ];
  }

  return shuffled;
}

function removeDuplicates(results) {
  return results.filter(
    (place, index, self) =>
      index === self.findIndex((item) => item.name === place.name),
  );
}
