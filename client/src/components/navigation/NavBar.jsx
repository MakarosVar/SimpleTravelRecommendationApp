import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { FavContext } from '../../context/FavoriteContext';
import { TripContext } from '../../context/TripContext';

export default function NavBar() {
  const { favorites } = useContext(FavContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { trip } = useContext(TripContext);

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
  function getNavLinkClass({ isActive }, extraClasses = '') {
    return `
    text-base font-bold transition
    ${extraClasses}
    ${isActive ? 'text-teal-300' : 'text-white hover:text-teal-300'}
  `;
  }
  function renderLinks(links, extraClasses = '', onClick) {
    return links.map((link) => (
      <NavLink
        key={link.path}
        to={link.path}
        onClick={onClick}
        className={(navData) =>
          getNavLinkClass(navData, extraClasses)
        }
      >
        {link.label}
      </NavLink>
    ));
  }
  const mainNavLinks = [
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
    {
      label: 'Trip',
      path: '/trip',
      badge: trip.length,
    },
  ];
  return (
    <nav className="fixed top-0 left-0 z-50 flex h-17.5 w-full items-center justify-between bg-black/75 px-8 text-white">
      <div className="flex items-center gap-2.5 text-3xl font-bold italic">
        <span>✈️</span>
        <span>TravelBloom</span>
      </div>
      <div className="hidden md:absolute md:left-1/2 md:flex md:-translate-x-1/2 md:items-center md:gap-8">
        {renderLinks(mainNavLinks)}
      </div>
      <div className="hidden md:flex items-center gap-4">
        {userLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={(navData) =>
              `${getNavLinkClass(navData)} relative inline-flex items-center gap-2`
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
          {renderLinks(mainNavLinks, 'block py-2', () => {
            setMenuOpen(false);
          })}
          <div className="mb-2.5 ml-3 w-50 h-0.5 bg-white"></div>
          {userLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => {
                setMenuOpen(false);
              }}
              className={(navData) =>
                `${getNavLinkClass(navData, 'flex items-center gap-2 py-2')}`
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
