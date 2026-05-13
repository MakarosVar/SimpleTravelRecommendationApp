import { useNavigate, useParams } from 'react-router-dom';
import travelData from '../data/travelData.json';
import { useContext } from 'react';
import { FavContext } from '../context/FavoriteContext';
import { TripContext } from '../context/TripContext';
import PageContainer from '../components/layout/PageContainer';

export default function DestinationDetails() {
  const { id } = useParams();
  const destinationId = Number(id);
  const navigate = useNavigate();
  const destination = travelData.destinations.find(
    (destination) => destination.id === destinationId,
  );

  const { addToTrip, removeFromTrip, isInTrip } =
    useContext(TripContext);

  const inTrip = isInTrip(destination.id);
  const { toggleFavorite, isFavorite } = useContext(FavContext);
  const favorite = isFavorite(destinationId);

  if (!destination) {
    return (
      <div className="min-h-screen pt-32 text-center text-white">
        Destination not found.
      </div>
    );
  }
  return (
    <PageContainer>
      <div className="min-h-screen text-white">
        <section className="mx-auto relative max-w-5xl overflow-hidden rounded-3xl bg-black/50 shadow-2xl backdrop-blur">
          <div className="absolute left-6 right-6 top-6 z-10 flex items-start justify-between">
            <button
              className="rounded-full  bg-black/60  px-4 py-2  text-white  shadow-lg  backdrop-blur-md  border border-white/20"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
            <div className="flex gap-3">
              <button
                className="rounded-full  bg-teal-700/60  px-4 py-2 text-white  shadow-lg  backdrop-blur-md  border border-white/20"
                onClick={() => toggleFavorite(destination.id)}
              >
                {favorite ? '♥ Saved' : '♡ Save'}
              </button>
              <button
                onClick={() =>
                  inTrip
                    ? removeFromTrip(destination.id)
                    : addToTrip(destination.id)
                }
                className={`rounded-full  shadow-lg  backdrop-blur-md  border-white/20 border px-4 py-2 text-white transition ${
                  inTrip
                    ? 'bg-slate-600 hover:bg-slate-500'
                    : 'bg-teal-700 hover:bg-teal-600'
                }`}
              >
                {inTrip ? 'Remove from Trip' : 'Add to Trip'}
              </button>
            </div>
          </div>

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
    </PageContainer>
  );
}
