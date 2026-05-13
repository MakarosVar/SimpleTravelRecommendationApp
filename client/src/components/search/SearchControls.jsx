export default function SearchControls({
  searchTerm,
  selectedType,
  resultCount,
  sortBy,
  onSortChange,
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
      <div className="mt-3 flex items-center gap-2 text-sm">
        <label htmlFor="sort" className="font-semibold">
          Sort:
        </label>

        <select
          id="sort"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          className="rounded-lg bg-white px-3 py-1 text-gray-900"
        >
          <option value="default">Default</option>
          <option value="name">Name</option>
          <option value="country">Country</option>
        </select>
      </div>
    </div>
  );
}
