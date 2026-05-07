export function searchRecommendations(travelData, searchTerm) {
  const input = searchTerm.toLowerCase().trim();

  if (!input) {
    return [];
  }

  let results = travelData.destinations.filter((destination) => {
    return (
      destination.name.toLowerCase().includes(input) ||
      destination.country.toLowerCase().includes(input) ||
      destination.type.toLowerCase().includes(input) ||
      destination.tags.some((tag) =>
        tag.toLowerCase().includes(input),
      )
    );
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
