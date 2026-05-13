import Hero from '../components/layout/Hero';
import NoResults from '../components/search/NoResults';
import RecommendationList from '../components/search/RecommendationList';
import SearchControls from '../components/search/SearchControls';
import ErrorMessage from '../components/shared/ErrorMessage';
import LoadingMessage from '../components/shared/LoadingMessage';
import RetryButton from '../components/shared/RetryButton';
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
    reloadDestinations,
  } = useDestinationSearch();
  return (
    <section className="min-h-screen px-16 pt-30">
      <Hero
        onSearch={handleSearch}
        onClear={handleClear}
        hasResults={results.length > 0}
      />
      {isLoading && (
        <div className="mx-auto mt-8 max-w-xl rounded-2xl  border border-white/20 bg-white/10  px-6 py-4  backdrop-blur-md">
          <LoadingMessage message="Loading destinations..." />
        </div>
      )}
      {error && (
        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-red-400/30 bg-red-500/10 px-6 py-4 text-center backdrop-blur-md">
          <ErrorMessage message={error} />
          <RetryButton onRetry={reloadDestinations} />
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
