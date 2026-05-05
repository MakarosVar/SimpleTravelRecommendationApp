import DestinationCard from './DestinationCard';

function RecommendationList({ results }) {
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 grid auto-cols-[minmax(350px,40vw)] grid-flow-col gap-5 overflow-x-auto pb-2.5">
      {results.map((place) => (
        <DestinationCard key={place.name} place={place} />
      ))}
    </div>
  );
}

export default RecommendationList;
