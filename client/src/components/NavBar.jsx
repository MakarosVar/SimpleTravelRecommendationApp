import SearchBox from './SearchBox';

function NavBar({
  activePage,
  onPageChange,
  searchTerm,
  onSearchTermChange,
  onSearch,
  onClear,
}) {
  return (
    <nav className="fixed top-0 left-0 z-50 flex h-17.5 w-full items-center justify-between bg-black/75 px-8 text-white">
      <div className="flex items-center gap-2.5 text-3xl font-bold italic">
        <span>✈️</span> TravelBloom
      </div>
      <div className="absolute left-1/2 flex -translate-x-1/2 gap-8">
        <button
          onClick={() => onPageChange('home')}
          className={`text-base font-bold transition hover:text-teal-300 
            ${
              activePage === 'home' ? 'text-teal-300' : 'text-white'
            }`}
        >
          Home
        </button>
        <button
          onClick={() => onPageChange('about')}
          className={`text-base font-bold transition hover:text-teal-300 
            ${
              activePage === 'about' ? 'text-teal-300' : 'text-white'
            }`}
        >
          About Us
        </button>
        <button
          onClick={() => onPageChange('contact')}
          className={`text-base font-bold transition hover:text-teal-300 
            ${
              activePage === 'contact'
                ? 'text-teal-300'
                : 'text-white'
            }`}
        >
          Contact Us
        </button>
      </div>
      <div className="ml-auto">
        {activePage === 'home' && (
          <SearchBox
            searchTerm={searchTerm}
            onSearchTermChange={onSearchTermChange}
            onSearch={onSearch}
            onClear={onClear}
          />
        )}
      </div>
    </nav>
  );
}

export default NavBar;
