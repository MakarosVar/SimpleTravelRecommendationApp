import { NavLink } from 'react-router-dom';

export default function NavBar({ onClear }) {
  return (
    <nav className="fixed top-0 left-0 z-50 flex h-17.5 w-full items-center justify-between bg-black/75 px-8 text-white">
      <div className="flex items-center gap-2.5 text-3xl font-bold italic">
        <span>✈️</span>
        <span>TravelBloom</span>
      </div>
      <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-8">
        <NavLink
          to="/"
          onClick={onClear}
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
          onClick={onClear}
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
          onClick={onClear}
          className={({ isActive }) =>
            `text-base font-bold transition hover:text-teal-300 ${
              isActive ? 'text-teal-300' : 'text-white'
            }`
          }
        >
          Contact Us
        </NavLink>
      </div>
      <div className="flex items-center gap-4">
        <NavLink
          to="/favorites"
          onClick={onClear}
          className={({ isActive }) =>
            `text-base font-bold transition hover:text-teal-300 ${
              isActive ? 'text-teal-300' : 'text-white'
            }`
          }
        >
          Favorites
        </NavLink>
      </div>
    </nav>
  );
}
