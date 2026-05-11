export default function SearchBox({
  searchTerm,
  onSearchTermChange,
  onSearch,
  onClear,
}) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white p-1.5">
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => onSearchTermChange(event.target.value)}
        placeholder="Enter a destination or keyword"
        className="w-65 flex-1 rounded-full border-none p-2.5 text-sm text-teal-700 outline-none"
      />

      <div className="flex gap-3">
        <button
          className="cursor-pointer rounded-full border-none bg-teal-700 px-4 py-2 text-sm font-bold text-white"
          onClick={onSearch}
        >
          Search
        </button>

        <button
          className="cursor-pointer rounded-full border-none bg-teal-700 px-4 py-2 text-sm font-bold text-white"
          onClick={onClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
