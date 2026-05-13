import { useState } from 'react';
import travelData from '../data/travelData.json';
import { searchRecommendations } from '../utils/searchRecommendations';
import { sortDestinations } from '../utils/sortDestinations';

export function useDestinationSearch() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('random');

  function handleSearch(searchTerm, selectedType) {
    setSearchTerm(searchTerm);
    setSelectedType(selectedType);

    const searchResults = searchRecommendations(
      travelData,
      searchTerm,
      selectedType,
    );
    const sortedResults = sortDestinations(searchResults, sortBy);
    setResults(sortedResults);
  }
  function changeSort(sortValue) {
    setSortBy(sortValue);
    setResults((currentResults) =>
      sortDestinations(currentResults, sortValue),
    );
  }

  function handleClear() {
    setSearchTerm('');
    setSelectedType('all');
    setResults([]);
  }

  return {
    results,
    searchTerm,
    selectedType,
    sortBy,
    handleSearch,
    handleClear,
    changeSort,
  };
}
