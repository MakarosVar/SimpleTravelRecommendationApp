import { Link } from 'react-router-dom';

export default function TripItemCard({ item, onEdit, onRemove }) {
  const destination = item.destination;

  if (!destination) return null;

  const destinationId = destination._id;
  const priorityClasses = {
    low: 'bg-emerald-500/20 text-emerald-200 border-emerald-300/30',
    medium: 'bg-yellow-500/20 text-yellow-200 border-yellow-300/30',
    high: 'bg-red-500/20 text-red-200 border-red-300/30',
  };
  return (
    <article className="group relative min-h-90 overflow-hidden rounded-2xl shadow-lg">
      {destination.imageUrl && (
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      )}

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex h-full min-h-90 flex-col p-6 text-white">
        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                priorityClasses[item.priority]
              }`}
            >
              {item.priority}
            </span>

            {item.order !== undefined && (
              <span className="rounded-full bg-black/30 px-3 py-1 text-xs backdrop-blur">
                Stop #{item.order + 1}
              </span>
            )}
          </div>

          <h2 className="text-2xl font-bold">{destination.name}</h2>

          <p className="mt-1 text-sm text-white/80">
            {destination.country}
          </p>

          {destination.type && (
            <p className="mt-1 text-sm text-white/70">
              {destination.type}
            </p>
          )}
        </div>

        <div className="mt-auto space-y-4">
          {item.note ? (
            <p className="line-clamp-3 rounded-xl bg-white/15 p-3 text-sm text-white/90 backdrop-blur">
              {item.note}
            </p>
          ) : (
            <p className="rounded-xl bg-white/10 p-3 text-sm text-white/70 backdrop-blur">
              No note added yet.
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <Link
              to={`/destinations/${destinationId}`}
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
            >
              View destination
            </Link>

            <button
              type="button"
              onClick={() => onEdit(item)}
              className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => onRemove(destinationId)}
              className="rounded-lg bg-red-600/90 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
