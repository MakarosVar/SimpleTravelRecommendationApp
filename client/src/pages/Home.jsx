import Hero from '../components/Hero';
import RecommendationList from '../components/RecommendationList';

function Home({ results }) {
  return (
    <section className="min-h-screen px-16 pt-30">
      {results.length === 0 && <Hero />}
      <RecommendationList results={results} />
    </section>
  );
}

export default Home;
