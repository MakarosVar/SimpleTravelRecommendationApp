import { useState } from 'react';

export default function TripItemEditModal({
  item,
  onClose,
  onSave,
  isSaving,
}) {
  const destination = item.destination;

  const [note, setNote] = useState(item.note ?? '');
  const [priority, setPriority] = useState(item.priority ?? 'medium');

  function handleSubmit(e) {
    e.preventDefault();

    onSave(destination._id, {
      note,
      priority,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div
          className="relative h-44 bg-cover bg-center"
          style={{
            backgroundImage: destination.imageUrl
              ? `url(${destination.imageUrl})`
              : undefined,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
            <h2 className="text-2xl font-bold">{destination.name}</h2>
            <p className="text-sm text-white/80">
              {destination.country}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Note
            </label>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Add personal notes for this stop..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {isSaving ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
