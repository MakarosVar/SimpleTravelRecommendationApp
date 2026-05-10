import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { FavProvider } from './context/FavoriteContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavProvider>
      <App />
    </FavProvider>
  </StrictMode>,
);
