import { useState } from 'react';

export default function TripItemCard({ item, onUpdate, onRemove }) {
  const [note, setNote] = useState(item.note);
  const [priority, setPriority] = useState(item.priority);
  const destination = item.destination;

  const priorityClasses = {
    low: 'bg-emerald-500/20 text-emerald-200 border-emerald-300/30',
    medium: 'bg-yellow-500/20 text-yellow-200 border-yellow-300/30',
    high: 'bg-red-500/20 text-red-200 border-red-300/30',
  };
  function handleRemove() {
    onRemove(item.destinationId);
  }
  function handleSave() {
    onUpdate(item.destinationId, {
      note,
      priority,
    });
  }
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: `url(${destination.imageUrl})`,
        }}
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/45 to-black/75" />

      <div className="relative z-10">
        <div className="flex gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold">{destination.name}</h2>
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                priorityClasses[priority]
              }`}
            >
              {priority}
            </span>

            <p className="mt-1 text-lg font-semibold text-teal-300">
              {destination.country} • {destination.type}
            </p>

            <p className="mt-2 line-clamp-2 text-lg font-medium text-white/90">
              {destination.description}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-2 block text-lg font-bold text-white">
            Trip notes
          </label>

          <textarea
            className="h-24 w-full resize-none rounded-xl border border-white/20 bg-white/20 p-3 text-white placeholder:text-white/80 outline-none focus:border-teal-400"
            placeholder="Add trip notes..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-lg font-bold text-white">
            Priority
          </label>

          <select
            className="w-full appearance-none rounded-xl border border-white/20 bg-white/10 p-3 text-white outline-none focus:border-teal-400"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
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
        <div className="flex w-full items-center justify-between">
          <button
            className="mt-4 rounded-lg border border-white/20 bg-black/10 
          px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-black/80 "
            onClick={handleRemove}
          >
            Remove from Trip
          </button>
          <button
            className="mt-4 rounded-lg border border-white/20 bg-teal-400 
          px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-teal-600 "
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </article>
  );
}
