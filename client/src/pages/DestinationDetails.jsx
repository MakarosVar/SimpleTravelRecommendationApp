import { useParams } from 'react-router-dom';
import travelData from '../data/travelData.json';

function DestinationDetails() {
  const { id } = useParams();
  const destination = travelData.destinations.find(
    (destination) => destination.id === Number(id),
  );
  if (!destination) {
    return (
      <div className="min-h-screen pt-32 text-center text-white">
        Destination not found.
      </div>
    );
  }
  return (
    <div className="min-h-screen px-6 pt-28 pb-16 text-white">
      <section className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-black/50 shadow-2xl backdrop-blur">
        <img
          className="h-105 w-full object-cover"
          src={destination.imageUrl}
        ></img>
        <div className="space-y-6 p-8">
          <h1 className="text-4xl font-bold md:text-5xl">
            {destination.name}
          </h1>
          <h2 className="text-lg text-teal-300">
            {destination.country} • {destination.type}
          </h2>
          <p className="max-w-3xl text-lg leading-8 text-gray-200">
            {destination.description}
          </p>
          <ul className="flex flex-wrap gap-3">
            {destination.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-teal-500/20 px-4 py-2 text-sm font-medium text-teal-200"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
export default DestinationDetails;
