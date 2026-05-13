import { useEffect, useState } from 'react';
import { getDestinations } from '../services/destinationService';
import { searchRecommendations } from '../utils/searchRecommendations';
import { sortDestinations } from '../utils/sortDestinations';
import { useSearchParams } from 'react-router-dom';

export function useDestinationSearch() {
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
    async function loadDestinations() {
      try {
        setIsLoading(true);
        setError(null);

        const loadedDestinations = await getDestinations();

        setDestinations(loadedDestinations);
      } catch {
        setError('Could not load destinations.');
      } finally {
        setIsLoading(false);
      }
    }

    loadDestinations();
  }, []);
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
    handleSearch,
    handleClear,
    changeSort,
  };
}
