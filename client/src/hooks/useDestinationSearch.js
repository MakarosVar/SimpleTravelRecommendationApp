import { useState } from 'react';
import travelData from '../data/travelData.json';
import { searchRecommendations } from '../utils/searchRecommendations';
import { sortDestinations } from '../utils/sortDestinations';
import { useSearchParams } from 'react-router-dom';

export function useDestinationSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('q') || '',
  );
  const [selectedType, setSelectedType] = useState(
    searchParams.get('type') || 'all',
  );
  const [sortBy, setSortBy] = useState(
    searchParams.get('sort') || 'default',
  );
  const results =
    !searchTerm && selectedType === 'all'
      ? []
      : sortDestinations(
          searchRecommendations(travelData, searchTerm, selectedType),
          sortBy,
        );
  function handleSearch(searchTerm, selectedType) {
    setSearchTerm(searchTerm);
    setSelectedType(selectedType);

    setSearchParams({
      q: searchTerm,
      type: selectedType,
      sort: sortBy,
    });
  }
  function changeSort(sortValue) {
    setSortBy(sortValue);

    setSearchParams({
      q: searchTerm,
      type: selectedType,
      sort: sortValue,
    });
  }
  function handleClear() {
    setSearchTerm('');
    setSelectedType('all');
    setSortBy('default');
    setSearchParams({});
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
