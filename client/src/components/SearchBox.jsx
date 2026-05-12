export default function SearchBox({
  searchTerm,
  onSearchTermChange,
  onSearch,
  onClear,
}) {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3 rounded-4xl bg-white p-4 md:flex-row md:items-center md:rounded-full md:p-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => onSearchTermChange(event.target.value)}
        className="w-full flex-1 rounded-full px-4 py-2 text-sm outline-none"
        placeholder="Enter a destination or keyword"
      />

      <div className="flex w-full gap-3 md:w-auto">
        <button
          className="flex-1 cursor-pointer rounded-full border-none bg-teal-700 px-4 py-2 text-sm font-bold text-white"
          onClick={onSearch}
        >
          Search
        </button>

        <button
          className="flex-1 cursor-pointer rounded-full border-none bg-teal-700 px-4 py-2 text-sm font-bold text-white"
          onClick={onClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
