import { useState } from 'react';
import NavBar from './components/NavBar';
import SocialLinks from './components/SocialLinks';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  const [activePage, setActivePage] = useState('home');
  return (
    <>
      <NavBar activePage={activePage} onPageChange={setActivePage} />
      <SocialLinks />
      {activePage === 'home' && <Home />}
      {activePage === 'about' && <About />}
      {activePage === 'contact' && <Contact />}
    </>
  );
}
export default App;
