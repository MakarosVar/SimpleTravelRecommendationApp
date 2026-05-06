import { useState } from 'react';
import NavBar from './components/NavBar';
import SocialLinks from './components/SocialLinks';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import travelData from './data/travelData.json';
import { searchRecommendations } from './utils/searchRecommendations';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  // function handlePageChange(page) {
  //   setActivePage(page);

  //   if (page !== 'home') {
  //     setSearchTerm('');
  //     setResults([]);
  //   }
  // }

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
      <BrowserRouter>
        <NavBar
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onSearch={handleSearch}
          onClear={handleClear}
        />
        <SocialLinks />
        <Routes>
          <Route path="/" element={<Home results={results} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
