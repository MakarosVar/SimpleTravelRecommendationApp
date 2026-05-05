function SearchBox() {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white p-1.5">
      <input
        type="text"
        placeholder="Enter a destination or keyword"
        className="w-65 rounded-full border-none p-2.5 text-sm text-teal-700 outline-none"
      />

      <button className="cursor-pointer rounded-full border-none bg-teal-700 px-4 py-2 text-sm font-bold text-white">
        Search
      </button>

      <button className="cursor-pointer rounded-full border-none bg-teal-700 px-4 py-2 text-sm font-bold text-white">
        Clear
      </button>
    </div>
  );
}

export default SearchBox;
