import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TripContext } from '../../context/TripContext';
import { useAuth } from '../../context/AuthContext';
export default function DestinationCard({ place }) {
  const { addToTrip, removeFromTrip, isInTrip } =
    useContext(TripContext);

  const inTrip = isInTrip(place._id);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleAddToTrip() {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    addToTrip(place._id);
  }

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
            to={`/destination/${place._id}`}
            className="mt-auto w-fit"
          >
            <button className="rounded bg-teal-700 px-5 py-2.5 text-white transition hover:bg-teal-600">
              Visit
            </button>
          </Link>
          <button
            onClick={() =>
              inTrip ? removeFromTrip(place._id) : handleAddToTrip()
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
