import { useState } from 'react';

export default function SearchBox({ onSearch, onClear }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const types = ['all', 'beach', 'temple', 'city'];

  return (
    <div>
      <div className="flex w-full max-w-2xl flex-col gap-3 rounded-4xl bg-white p-4 md:flex-row md:items-center md:rounded-full md:p-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="w-full flex-1 rounded-full px-4 py-2 text-sm outline-none"
          placeholder="Enter a destination or keyword"
        />
        <div className="flex w-full gap-3 md:w-auto">
          <button
            className="flex-1 cursor-pointer rounded-full border-none bg-teal-700 px-4 py-2 text-sm font-bold text-white"
            onClick={() => onSearch(searchTerm, selectedType)}
          >
            Search
          </button>

          <button
            className="flex-1 cursor-pointer rounded-full border-none bg-teal-700 px-4 py-2 text-sm font-bold text-white"
            onClick={() => {
              setSearchTerm('');
              setSelectedType('all');
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
            onClick={() => setSelectedType(type)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selectedType === type
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
