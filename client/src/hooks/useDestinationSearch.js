import { useEffect, useState } from 'react';
import { searchRecommendations } from '../utils/searchRecommendations';
import { sortDestinations } from '../utils/sortDestinations';
import { useSearchParams } from 'react-router-dom';
import { useDestinations } from './useDestinations';

export function useDestinationSearch() {
  const { destinations, isLoading, error, reloadDestinations } =
    useDestinations();
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
          searchRecommendations(
            { destinations },
            searchTerm,
            selectedType,
          ),
          sortBy,
        );
  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
    setSelectedType(searchParams.get('type') || 'all');
    setSortBy(searchParams.get('sort') || 'default');
  }, [searchParams]);

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
    error,
    isLoading,
    setSearchTerm,
    setSelectedType,
    handleSearch,
    handleClear,
    changeSort,
    reloadDestinations,
  };
}
