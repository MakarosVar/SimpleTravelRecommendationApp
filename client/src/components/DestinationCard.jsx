import { Link } from 'react-router-dom';
function DestinationCard({ place }) {
  return (
    <article className="flex flex-col p-4.5 flex-1 min-h-108 overflow-hidden rounded-xl bg-white text-gray-900 shadow-2xl">
      <img
        src={place.imageUrl}
        alt={place.name}
        className=" h-60 w-full object-cover"
      />

      <div className="flex flex-1 flex-col p-4.5">
        <h2 className="mb-2.5 text-2xl font-bold">{place.name}</h2>

        <p className="mb-4 line-clamp-3 leading-6 text-gray-600">
          {place.description}
        </p>

        <Link
          to={`/destination/${place.id}`}
          className="mt-auto w-fit"
        >
          <button className="rounded bg-teal-700 px-5 py-2.5 text-white transition hover:bg-teal-600">
            Visit
          </button>
        </Link>
      </div>
    </article>
  );
}

export default DestinationCard;
