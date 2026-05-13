import Hero from '../components/layout/Hero';
import NoResults from '../components/search/NoResults';
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
    isLoading,
    error,
    sortBy,
    changeSort,
  } = useDestinationSearch();
  return (
    <section className="min-h-screen px-16 pt-30">
      <Hero
        onSearch={handleSearch}
        onClear={handleClear}
        hasResults={results.length > 0}
      />
      {isLoading && (
        <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-6 text-center text-white backdrop-blur-md">
          Loading destinations...
        </div>
      )}
      {error && (
        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-red-400/30 bg-red-500/10 p-6 text-center text-red-100 backdrop-blur-md">
          {error}
        </div>
      )}
      {results.length > 0 && (
        <SearchControls
          searchTerm={searchTerm}
          selectedType={selectedType}
          resultCount={results.length}
          sortBy={sortBy}
          onSortChange={changeSort}
        />
      )}
      {!isLoading && searchTerm && results.length === 0 && (
        <NoResults
          searchTerm={searchTerm}
          selectedType={selectedType}
        />
      )}
      <div className={results.length > 0 ? 'ml-30' : ''}>
        {!isLoading && <RecommendationList results={results} />}
      </div>
    </section>
  );
}
