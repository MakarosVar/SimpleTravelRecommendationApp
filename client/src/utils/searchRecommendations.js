export function searchRecommendations(travelData, searchTerm) {
  const input = searchTerm.toLowerCase().trim();

  if (!input) {
    return [];
  }

  let results = [];

  if (input.includes('beach') || input.includes('beaches')) {
    results = travelData.beaches;
  } else if (input.includes('temple') || input.includes('temples')) {
    results = travelData.temples;
  } else if (
    input.includes('country') ||
    input.includes('countries') ||
    input.includes('city') ||
    input.includes('cities')
  ) {
    results = travelData.countries.flatMap(
      (country) => country.cities,
    );
  } else {
    travelData.countries.forEach((country) => {
      if (country.name.toLowerCase().includes(input)) {
        results = country.cities;
      }

      country.cities.forEach((city) => {
        if (city.name.toLowerCase().includes(input)) {
          results.push(city);
        }
      });
    });

    travelData.temples.forEach((temple) => {
      if (temple.name.toLowerCase().includes(input)) {
        results.push(temple);
      }
    });

    travelData.beaches.forEach((beach) => {
      if (beach.name.toLowerCase().includes(input)) {
        results.push(beach);
      }
    });
  }
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
