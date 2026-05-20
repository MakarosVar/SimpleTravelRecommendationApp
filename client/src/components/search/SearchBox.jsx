import { useEffect, useState } from 'react';

export default function SearchBox({
  searchTerm,
  selectedType,
  onSearch,
  onClear,
}) {
  const types = ['all', 'beach', 'temple', 'city'];
  const [draftSearchTerm, setDraftSearchTerm] = useState(searchTerm);
  const [draftSelectedType, setDraftSelectedType] =
    useState(selectedType);

  useEffect(() => {
    setDraftSearchTerm(searchTerm);
    setDraftSelectedType(selectedType);
  }, [searchTerm, selectedType]);

  return (
    <div>
      <div className="flex w-full max-w-2xl flex-col gap-3 rounded-4xl bg-white p-4 md:flex-row md:items-center md:rounded-full md:p-2">
        <input
          type="text"
          value={draftSearchTerm}
          onChange={(e) => setDraftSearchTerm(e.target.value)}
          className="w-full flex-1 rounded-full px-4 py-2 text-sm outline-none"
          placeholder="Enter a destination or keyword"
        />
        <div className="flex w-full gap-3 md:w-auto">
          <button
            className="flex-1 cursor-pointer rounded-full border-none bg-teal-700 px-4 py-2 text-sm font-bold text-white"
            onClick={() =>
              onSearch(draftSearchTerm, draftSelectedType)
            }
          >
            Search
          </button>

          <button
            className="flex-1 cursor-pointer rounded-full border-none bg-teal-700 px-4 py-2 text-sm font-bold text-white"
            onClick={() => {
              setDraftSearchTerm('');
              setDraftSelectedType('all');
              onClear();
            }}
          >
            Clear
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {types.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setDraftSelectedType(type)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              draftSelectedType === type
                ? 'bg-teal-500 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
