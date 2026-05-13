export default function NoResults({ searchTerm, selectedType }) {
  return (
    <div className="ml-30 mt-8 max-w-xl rounded-2xl bg-black/35 p-6 text-white backdrop-blur-sm">
      <h2 className="text-xl font-bold">No destinations found</h2>

      <p className="mt-2 text-sm text-white/80">
        Try a different keyword or change the filter.
      </p>

      <p className="mt-4 text-sm">
        Search:{' '}
        <span className="font-bold text-teal-300">
          "{searchTerm}"
        </span>
      </p>

      <p className="text-sm">
        Filter:{' '}
        <span className="font-bold text-teal-300">
          {selectedType}
        </span>
      </p>
    </div>
  );
}
