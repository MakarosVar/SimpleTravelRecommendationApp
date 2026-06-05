import { Link } from 'react-router-dom';

export default function PackageCard({ packageItem }) {
  return (
    <article className="flex flex-col rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-xl font-bold text-slate-950">
          {packageItem.title}
        </h2>

        {(packageItem.travelStyle || packageItem.duration) && (
          <p className="mb-2 text-sm font-semibold text-teal-600">
            {[packageItem.travelStyle, packageItem.duration]
              .filter(Boolean)
              .join(' • ')}
          </p>
        )}
        {packageItem.description && (
          <p className="mt-2 line-clamp-3 text-sm text-slate-600">
            {packageItem.description}
          </p>
        )}

        <div className="mt-4 text-sm text-slate-500">
          {packageItem.destinations?.length ?? 0} destinations
        </div>

        {packageItem.destinations?.length > 0 && (
          <ul className="mt-3 space-y-1 text-sm text-slate-600">
            {packageItem.destinations
              .slice(0, 3)
              .map((destination) => (
                <li key={destination._id}>• {destination.name}</li>
              ))}

            {packageItem.destinations.length > 3 && (
              <li className="text-slate-400">
                +{packageItem.destinations.length - 3} more
              </li>
            )}
          </ul>
        )}

        <div className="mt-6">
          <Link
            to={`/packages/${packageItem._id}`}
            className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            View package
          </Link>
        </div>
      </div>
    </article>
  );
}
