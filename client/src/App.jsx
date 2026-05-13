import NavBar from './components/navigation/NavBar';
import SocialLinks from './components/shared/SocialLinks';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DestinationDetails from './pages/DestinationDetails';
import Favorites from './pages/Favorites';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <SocialLinks />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/destination/:id"
            element={<DestinationDetails />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
