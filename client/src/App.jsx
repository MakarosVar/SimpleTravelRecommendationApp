import { useState } from 'react';
import NavBar from './components/NavBar';
import SocialLinks from './components/SocialLinks';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import travelData from './data/travelData.json';
import { searchRecommendations } from './utils/searchRecommendations';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  function handleSearch() {
    const searchResults = searchRecommendations(
      travelData,
      searchTerm,
    );
    setResults(searchResults);
  }

  function handleClear() {
    setSearchTerm('');
    setResults([]);
  }
  return (
    <>
      <NavBar
        activePage={activePage}
        onPageChange={setActivePage}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearch={handleSearch}
        onClear={handleClear}
      />
      <SocialLinks />
      {activePage === 'home' && <Home results={results} />}
      {activePage === 'about' && <About />}
      {activePage === 'contact' && <Contact />}
    </>
  );
}
export default App;
