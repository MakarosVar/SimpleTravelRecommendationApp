export function sortDestinations(destinations, sortBy) {
  const sorted = [...destinations];

  if (sortBy === 'name') {
    return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy === 'country') {
    return sorted.sort((a, b) => a.country.localeCompare(b.country));
  }

  return sorted;
}
