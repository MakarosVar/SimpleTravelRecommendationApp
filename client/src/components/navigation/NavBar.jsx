import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { FavContext } from '../../context/FavoriteContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useTrips } from '../../hooks/useTrips';
import { useQueryClient } from '@tanstack/react-query';

export default function NavBar() {
  const { favorites, clearFavorites } = useContext(FavContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { isAuthenticated, logout, user } = useAuth();
  const { trips } = useTrips({ enabled: isAuthenticated });
  const location = useLocation();
  const [logoutPending, setLogoutPending] = useState(false);

  const navigate = useNavigate();
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  function handleLogout() {
    setLogoutPending(true);
    navigate('/', { replace: true });
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
  useEffect(() => {
    if (!logoutPending) return;
    if (location.pathname !== '/') return;

    logout();
    clearFavorites();
    queryClient.removeQueries({ queryKey: ['trips'] });
    addToast('Logged out successfully', 'info');
    setLogoutPending(false);
  }, [
    logoutPending,
    location.pathname,
    logout,
    clearFavorites,

    addToast,
  ]);
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
    { label: 'Packages', path: '/packages' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
  ];
  const isAdmin = isAuthenticated && user?.role === 'admin';

  const userLinks = isAuthenticated
    ? [
        ...(isAdmin
          ? [
              {
                label: 'Admin',
                path: '/admin',
              },
            ]
          : []),
        {
          label: 'Favorites',
          path: '/favorites',
          badge: favorites.length,
        },
        {
          label: 'Trip',
          path: '/trip',
          badge: trips.length,
        },
      ]
    : [
        {
          label: 'Login',
          path: '/login',
        },
        {
          label: 'Register',
          path: '/register',
        },
      ];
  return (
    <nav className="fixed top-0 left-0 z-50 flex h-17.5 w-full items-center justify-between bg-black px-8 text-white">
      <div className="flex items-center gap-2.5 text-3xl font-bold italic">
        <span>✈️</span>
        <span>TravelBloom</span>
      </div>
      <div className="hidden md:absolute md:left-1/2 md:flex md:-translate-x-1/2 md:items-center md:gap-8">
        {renderLinks(mainNavLinks)}
      </div>
      <div className="hidden lg:flex items-center gap-4">
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
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="text-base font-bold text-white hover:text-teal-300"
          >
            Logout
          </button>
        )}
      </div>
      <div className="relative lg:hidden" ref={menuRef}>
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
          {isAuthenticated && (
            <button
              className="text-base font-bold text-white hover:text-teal-300"
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
