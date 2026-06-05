import DestinationCard from '../cards/DestinationCard';

export default function RecommendationList({ results }) {
  if (!results || results.length === 0) {
    return null;
  }
  const visibleResults = results.slice(0, 6);

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
      {visibleResults.map((place) => (
        <DestinationCard key={place._id} place={place} />
      ))}
    </div>
  );
}
