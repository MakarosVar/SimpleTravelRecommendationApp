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
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const userLinks = [
    {
      label: 'Favorites',
      path: '/favorites',
      badge: favorites.length,
    },
  ];
  return (
    <nav className="fixed top-0 left-0 z-50 flex h-17.5 w-full items-center justify-between bg-black/75 px-8 text-white">
      <div className="flex items-center gap-2.5 text-3xl font-bold italic">
        <span>✈️</span>
        <span>TravelBloom</span>
      </div>
      <div className="hidden md:absolute md:left-1/2 md:flex md:-translate-x-1/2 md:items-center md:gap-8">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={onClear}
            className={({ isActive }) =>
              `text-base font-bold transition hover:text-teal-300 ${
                isActive ? 'text-teal-300' : 'text-white'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <div className="hidden md:flex items-center gap-4">
        {userLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={onClear}
            className={({ isActive }) =>
              `text-base font-bold transition inline-flex items-center gap-2 hover:text-teal-300 ${
                isActive ? 'text-teal-300' : 'text-white'
              }`
            }
          >
            <span>{link.label}</span>
            {link.badge > 0 && (
              <span className="rounded-full bg-teal-600  px-2 py-0.5 text-xs font-bold text-white">
                {link.badge}
              </span>
            )}
          </NavLink>
        ))}
      </div>
      <div className="relative md:hidden" ref={menuRef}>
        <button
          className="text-3xl"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
        <div
          className={`absolute flex flex-col top-18 mt-2 right-0 w-64 gap-3 
            shadow-lg rounded-md items-center text-white bg-black/75 transition-all duration-300 ease-in-out
            ${
              menuOpen
                ? 'translate-y-0 opacity-100 pointer-events-auto'
                : '-translate-y-6 opacity-0 pointer-events-none'
            }`}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={handleMobileNavigation}
              className={({ isActive }) =>
                `text-base font-bold transition hover:text-teal-300 ${
                  isActive ? 'text-teal-300' : 'text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="mb-2.5 ml-3 w-50 h-0.5 bg-white"></div>
          {userLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={handleMobileNavigation}
              className={({ isActive }) =>
                `text-base font-bold transition inline-flex items-center gap-2 hover:text-teal-300 ${
                  isActive ? 'text-teal-300' : 'text-white'
                }`
              }
            >
              <span>{link.label}</span>
              {link.badge > 0 && (
                <span className="rounded-full bg-teal-600 px-2 py-0.5 text-xs font-bold text-white">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
