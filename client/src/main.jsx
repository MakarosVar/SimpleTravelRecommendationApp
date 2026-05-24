import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { FavProvider } from './context/FavoriteContext.jsx';
import { TripProvider } from './context/TripContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <FavProvider>
            <TripProvider>
              <App />
            </TripProvider>
          </FavProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ToastProvider>
  </StrictMode>,
);
