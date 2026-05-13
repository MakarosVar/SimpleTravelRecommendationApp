export default function SearchControls({
  searchTerm,
  selectedType,
  resultCount,
}) {
  return (
    <div className="ml-30 mt-6 w-fit rounded-2xl bg-black/35 px-5 py-3 text-white backdrop-blur-sm">
      <p className="text-sm">
        Showing <span className="font-bold">{resultCount}</span>{' '}
        results for{' '}
        <span className="font-bold text-teal-300">
          "{searchTerm}"
        </span>
      </p>

      <p className="mt-1 text-sm">
        Filter:{' '}
        <span className="font-bold text-teal-300">
          {selectedType}
        </span>
      </p>
    </div>
  );
}
