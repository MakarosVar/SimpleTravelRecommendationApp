export default function TripItemCard({ item, onUpdate, onRemove }) {
  const destination = item.destination;
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url(${destination.imageUrl})`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/60" />

      <div className="relative z-10">
        <div className="flex gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold">{destination.name}</h2>

            <p className="mt-1 text-sm font-semibold text-teal-300">
              {destination.country} • {destination.type}
            </p>

            <p className="mt-2 line-clamp-2 text-sm text-white/80">
              {destination.description}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-2 block text-sm font-semibold">
            Trip notes
          </label>

          <textarea
            className="h-24 w-full resize-none rounded-xl border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/50 outline-none focus:border-teal-400"
            placeholder="Add trip notes..."
            value={item.note}
            onChange={(e) =>
              onUpdate(item.destinationId, {
                note: e.target.value,
              })
            }
          />
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-semibold">
            Priority
          </label>

          <select
            className="w-full appearance-none rounded-xl border border-white/20 bg-white/10 p-3 text-white outline-none focus:border-teal-400"
            value={item.priority}
            onChange={(e) =>
              onUpdate(item.destinationId, {
                priority: e.target.value,
              })
            }
          >
            <option className="bg-slate-800 text-white" value="low">
              Low
            </option>
            <option
              className="bg-slate-800 text-white"
              value="medium"
            >
              Medium
            </option>
            <option className="bg-slate-800 text-white" value="high">
              High
            </option>
          </select>
        </div>

        <button
          className="mt-4 rounded-lg border border-white/20 bg-black/10 
          px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-black/80 "
          onClick={() => onRemove(item.destinationId)}
        >
          Remove from Trip
        </button>
      </div>
    </article>
  );
}
