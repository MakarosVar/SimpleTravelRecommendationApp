import Hero from '../components/layout/Hero';
import RecommendationList from '../components/search/RecommendationList';
import SearchControls from '../components/search/SearchControls';
import { useDestinationSearch } from '../hooks/useDestinationSearch';

export default function Home() {
  const {
    results,
    searchTerm,
    selectedType,
    handleSearch,
    handleClear,
  } = useDestinationSearch();
  return (
    <section className="min-h-screen px-16 pt-30">
      <Hero
        onSearch={handleSearch}
        onClear={handleClear}
        hasResults={results.length > 0}
      />
      {results.length > 0 && (
        <SearchControls
          searchTerm={searchTerm}
          selectedType={selectedType}
          resultCount={results.length}
        />
      )}
      <div className={results.length > 0 ? 'ml-30' : ''}>
        <RecommendationList results={results} />
      </div>
    </section>
  );
}
