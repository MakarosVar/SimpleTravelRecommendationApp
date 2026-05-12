import DestinationCard from './DestinationCard';

export default function RecommendationList({ results }) {
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col mt-10 md:grid md:auto-cols-[minmax(350px,40vw)] md:grid-flow-col gap-6 md:overflow-x-auto pb-2.5">
      {results.map((place) => (
        <DestinationCard key={place.name} place={place} />
      ))}
    </div>
  );
}
