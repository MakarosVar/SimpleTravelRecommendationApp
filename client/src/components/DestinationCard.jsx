function DestinationCard({ place }) {
  return (
    <article className="overflow-hidden rounded-xl bg-white text-gray-900 shadow-2xl">
      <img
        src={place.imageUrl}
        alt={place.name}
        className="block h-60 w-full object-cover"
      />

      <div className="p-4.5">
        <h2 className="mb-2.5 text-[22px] font-bold">{place.name}</h2>

        <p className="mb-4 leading-6 text-gray-600">
          {place.description}
        </p>

        <button className="rounded bg-teal-700 px-5 py-2.5 text-white transition hover:bg-teal-600">
          Visit
        </button>
      </div>
    </article>
  );
}

export default DestinationCard;
