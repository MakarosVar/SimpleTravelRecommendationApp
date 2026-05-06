import Hero from '../components/Hero';
import RecommendationList from '../components/RecommendationList';

function Home({ results }) {
  return (
    <section className="min-h-screen px-16 pt-30">
      {results.length === 0 && <Hero />}
      <div className={results.length > 0 ? 'ml-30' : ''}>
        <RecommendationList results={results} />
      </div>
    </section>
  );
}

export default Home;
