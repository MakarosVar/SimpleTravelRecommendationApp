import { useEffect, useState } from 'react';
import NoResults from '../../components/search/NoResults';
import RecommendationList from '../../components/search/RecommendationList';
import SearchBox from '../../components/search/SearchBox';
import SearchControls from '../../components/search/SearchControls';
import { searchRecommendations } from '../../utils/searchRecommendations';
import { sortDestinations } from '../../utils/sortDestinations';
import ErrorMessage from '../../components/shared/ErrorMessage';
import LoadingMessage from '../../components/shared/LoadingMessage';
import RetryButton from '../../components/shared/RetryButton';
import { useDestinations } from '../../hooks/useDestinations';
import { Link, useSearchParams } from 'react-router-dom';

export default function Home() {
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

  return (
    <section className="min-h-screen px-16 pt-30">
      <div
        className={
          results.length > 0 ? 'ml-30 max-w-160' : 'ml-15 max-w-130'
        }
      >
        {results.length === 0 && (
          <>
            <h1 className="mb-6 text-5xl md:text-[72px] leading-[1.05] font-black text-white uppercase">
              Explore Dream Destinations!
            </h1>

            <p className="mb-6 rounded-md bg-black/25 p-4 text-lg leading-[1.8] text-white">
              TravelBloom encourages exploration of unfamiliar
              territories, embracing diverse cultures and landscapes,
              while pursuing the desired destination that captivates
              the heart and ignites a sense of wonder.
            </p>
            <div className="mt-8 mb-10 flex justify-center">
              <Link to="/discover" className="mt-auto w-fit">
                <button className="w-full rounded-full bg-teal-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:bg-teal-500">
                  Start Discovering!
                </button>
              </Link>
            </div>
          </>
        )}
        <SearchBox
          searchTerm={searchTerm}
          selectedType={selectedType}
          onSearchTermChange={setSearchTerm}
          onSelectedTypeChange={setSelectedType}
          onSearch={handleSearch}
          onClear={handleClear}
        />
      </div>
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
