import Hero from '../components/Hero';
import RecommendationList from '../components/RecommendationList';

export default function Home({
  results,
  searchTerm,
  onSearchTermChange,
  onSearch,
  onClear,
}) {
  return (
    <section className="min-h-screen px-16 pt-30">
      <Hero
        searchTerm={searchTerm}
        onSearchTermChange={onSearchTermChange}
        onSearch={onSearch}
        onClear={onClear}
        hasResults={results.length > 0}
      />
      <div className={results.length > 0 ? 'ml-30' : ''}>
        <RecommendationList results={results} />
      </div>
    </section>
  );
}
