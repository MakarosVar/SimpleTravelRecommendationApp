import { NavLink, useLocation } from 'react-router-dom';
import SearchBox from './SearchBox';

function NavBar({
  searchTerm,
  onSearchTermChange,
  onSearch,
  onClear,
}) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 z-50 flex h-17.5 w-full items-center justify-between bg-black/75 px-8 text-white">
      <div className="flex items-center gap-2.5 text-3xl font-bold italic">
        <span>✈️</span> TravelBloom
      </div>
      <div className="absolute left-1/2 flex -translate-x-1/2 gap-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-base font-bold transition hover:text-teal-300 ${
              isActive ? 'text-teal-300' : 'text-white'
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-base font-bold transition hover:text-teal-300 ${
              isActive ? 'text-teal-300' : 'text-white'
            }`
          }
        >
          About Us
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `text-base font-bold transition hover:text-teal-300 ${
              isActive ? 'text-teal-300' : 'text-white'
            }`
          }
        >
          Contact Us
        </NavLink>
      </div>
      <div className="ml-auto">
        {isHomePage && (
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
