import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { FavContext } from '../context/FavoriteContext';

export default function NavBar({ onClear }) {
  const { favorites } = useContext(FavContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  function handleMobileNavigation() {
    onClear();
    setMenuOpen(false);
  }
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <nav className="fixed top-0 left-0 z-50 flex h-17.5 w-full items-center justify-between bg-black/75 px-8 text-white">
        <div className="flex items-center gap-2.5 text-3xl font-bold italic">
          <span>✈️</span>
          <span>TravelBloom</span>
        </div>
        <div className="hidden md:absolute md:left-1/2 md:flex md:-translate-x-1/2 md:items-center md:gap-8">
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
        <div className="hidden md:flex items-center gap-4">
          <NavLink
            to="/favorites"
            onClick={onClear}
            className={({ isActive }) =>
              `flex items-center gap-2 text-base font-bold transition hover:text-teal-300 ${
                isActive ? 'text-teal-300' : 'text-white'
              }`
            }
          >
            <span>Favorites</span>
            {favorites.length > 0 && (
              <span className="rounded-full bg-teal-600 px-2 py-0.5 text-xs font-bold text-white">
                {favorites.length}
              </span>
            )}
          </NavLink>
        </div>
        <div className="md:hidden" ref={menuRef}>
          <button
            className="text-3xl"
            onClick={() => setMenuOpen((current) => !current)}
          >
            ☰
          </button>
          {menuOpen && (
            <div className="absolute flex flex-col top-16 mt-2 right-0 w-56 gap-3 items-center text-white bg-black/75 shadow-lg rounded-md">
              <NavLink
                to="/"
                onClick={handleMobileNavigation}
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
                onClick={handleMobileNavigation}
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
                onClick={handleMobileNavigation}
                className={({ isActive }) =>
                  `text-base font-bold transition hover:text-teal-300 ${
                    isActive ? 'text-teal-300' : 'text-white'
                  }`
                }
              >
                Contact Us
              </NavLink>
              <NavLink
                to="/favorites"
                onClick={handleMobileNavigation}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-base font-bold transition hover:text-teal-300 ${
                    isActive ? 'text-teal-300' : 'text-white'
                  }`
                }
              >
                <span>Favorites</span>

                {favorites.length > 0 && (
                  <span className="rounded-full bg-teal-600 px-2 py-0.5 text-xs font-bold text-white">
                    {favorites.length}
                  </span>
                )}
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
