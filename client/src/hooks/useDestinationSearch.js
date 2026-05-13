import { useState } from 'react';
import travelData from '../data/travelData.json';
import { searchRecommendations } from '../utils/searchRecommendations';

export function useDestinationSearch() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  function handleSearch(searchTerm, selectedType) {
    setSearchTerm(searchTerm);
    setSelectedType(selectedType);

    const searchResults = searchRecommendations(
      travelData,
      searchTerm,
      selectedType,
    );

    setResults(searchResults);
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
    handleSearch,
    handleClear,
  };
}
