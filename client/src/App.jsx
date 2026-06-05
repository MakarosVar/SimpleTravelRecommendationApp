import NavBar from './components/navigation/NavBar';
import SocialLinks from './components/shared/SocialLinks';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DestinationDetails from './pages/public/DestinationDetails';
import Favorites from './pages/user/Favorites';
import Trip from './pages/user/Trip';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ToastContainer from './components/shared/ToastContainer';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminRoute from './components/auth/AdminRoute';
import AdminDestinationsPage from './pages/admin/AdminDestinationsPage';
import DestinationForm from './pages/admin/DestinationForm';
import AdminPackagesPage from './pages/admin/AdminPackagesPage';
import PackageBuilderPage from './pages/admin/PackageBuilderPage';
import PackageDetails from './pages/public/PackageDetails';
import TripDetails from './pages/user/TripDetails';
import Discover from './pages/public/Discover';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <SocialLinks />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/discover" element={<Discover />} />
          <Route
            path="/packages/:packageId"
            element={<PackageDetails />}
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trip"
            element={
              <ProtectedRoute>
                <Trip />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trip/:tripId"
            element={
              <ProtectedRoute>
                <TripDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/destinations/:id"
            element={<DestinationDetails />}
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/destinations"
            element={
              <AdminRoute>
                <AdminDestinationsPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/packages"
            element={
              <AdminRoute>
                <AdminPackagesPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/packages/new"
            element={
              <AdminRoute>
                <PackageBuilderPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/packages/:packageId/edit"
            element={
              <AdminRoute>
                <PackageBuilderPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/destinations/new"
            element={
              <AdminRoute>
                <DestinationForm />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/destinations/:destinationId/edit"
            element={
              <AdminRoute>
                <DestinationForm />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
