export function normalizeText(value) {
  return value.toLowerCase().trim();
}

export function matchesText(value, searchTerm) {
  return normalizeText(value).includes(normalizeText(searchTerm));
}
