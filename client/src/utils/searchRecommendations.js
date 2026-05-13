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

  return uniqueResults;
}

function removeDuplicates(results) {
  return results.filter(
    (place, index, self) =>
      index === self.findIndex((item) => item.name === place.name),
  );
}
