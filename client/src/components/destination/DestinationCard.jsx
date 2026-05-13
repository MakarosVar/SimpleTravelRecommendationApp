import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TripContext } from '../../context/TripContext';
export default function DestinationCard({ place }) {
  const { addToTrip, removeFromTrip, isInTrip } =
    useContext(TripContext);

  const inTrip = isInTrip(place.id);

  return (
    <article className="flex flex-col p-4.5 flex-1 min-h-108 overflow-hidden rounded-xl bg-white text-gray-900 shadow-2xl">
      <img
        src={place.imageUrl}
        alt={place.name}
        className=" h-60 w-full object-cover"
      />

      <div className="flex flex-1 flex-col p-4.5">
        <h2 className="mb-2 text-2xl font-bold">{place.name}</h2>
        <h2 className="mb-2 text-lg font-semibold text-teal-600">
          {place.country} • {place.type}
        </h2>

        <p className="mb-4 line-clamp-3 leading-6 text-gray-600">
          {place.description}
        </p>

        <div className="mt-auto flex flex-col md:flex-row gap-3">
          <Link
            to={`/destination/${place.id}`}
            className="mt-auto w-fit"
          >
            <button className="rounded bg-teal-700 px-5 py-2.5 text-white transition hover:bg-teal-600">
              Visit
            </button>
          </Link>
          <button
            onClick={() =>
              inTrip ? removeFromTrip(place.id) : addToTrip(place.id)
            }
            className={`mt-3 rounded px-5 py-2.5 text-white transition ${
              inTrip
                ? 'bg-slate-600 hover:bg-slate-500'
                : 'bg-teal-700 hover:bg-teal-600'
            }`}
          >
            {inTrip ? 'Remove from Trip' : 'Add to Trip'}
          </button>
        </div>
      </div>
    </article>
  );
}
