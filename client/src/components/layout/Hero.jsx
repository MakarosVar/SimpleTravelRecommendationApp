import SearchBox from '../search/SearchBox';

export default function Hero({ onSearch, onClear, hasResults }) {
  return (
    <div
      className={hasResults ? 'ml-30 max-w-160' : 'ml-15 max-w-130'}
    >
      {!hasResults && (
        <>
          <h1 className="mb-6 text-5xl md:text-[72px] leading-[1.05] font-black text-white uppercase">
            Explore Dream Destination
          </h1>

          <p className="mb-6 rounded-md bg-black/25 p-4 text-lg leading-[1.8] text-white">
            TravelBloom encourages exploration of unfamiliar
            territories, embracing diverse cultures and landscapes,
            while pursuing the desired destination that captivates the
            heart and ignites a sense of wonder.
          </p>
        </>
      )}
      <SearchBox onSearch={onSearch} onClear={onClear} />
    </div>
  );
}
