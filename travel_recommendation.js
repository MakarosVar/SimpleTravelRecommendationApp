let travelData = {};
fetch('./travel_recommendation_api.json')
  .then((response) => response.json())
  .then((data) => {
    travelData = data;
    console.log('JSON loaded:', travelData);
  })
  .catch((error) => {
    console.error('Error loading JSON:', error);
  });

function showPage(pageId) {
  document.querySelectorAll('.page-section').forEach((section) => {
    section.classList.remove('active');
  });

  document.getElementById(pageId).classList.add('active');

  const searchArea = document.getElementById('searchArea');

  if (pageId === 'home') {
    searchArea.style.display = 'flex';
  } else {
    searchArea.style.display = 'none';
    clearResults();
  }
}

function searchRecommendations() {
  const input = document
    .getElementById('searchInput')
    .value.toLowerCase()
    .trim();
  const resultsDiv = document.getElementById('results');

  resultsDiv.innerHTML = '';

  if (!travelData || Object.keys(travelData).length === 0) {
    resultsDiv.innerHTML = `
      <div class="card">
        <div class="card-content">
          <h2>Data still loading</h2>
          <p>Please wait a moment and try again.</p>
        </div>
      </div>
    `;
    return;
  }

  let results = [];

  if (input.includes('beach') || input.includes('beaches')) {
    results = travelData.beaches;
  } else if (input.includes('temple') || input.includes('temples')) {
    results = travelData.temples;
  } else if (
    input.includes('country') ||
    input.includes('countries') ||
    input.includes('city') ||
    input.includes('cities')
  ) {
    results = travelData.countries.flatMap(
      (country) => country.cities,
    );
  } else {
    travelData.countries.forEach((country) => {
      if (country.name.toLowerCase().includes(input)) {
        results = country.cities;
      }

      country.cities.forEach((city) => {
        if (city.name.toLowerCase().includes(input)) {
          results.push(city);
        }
      });
    });

    travelData.temples.forEach((temple) => {
      if (temple.name.toLowerCase().includes(input)) {
        results.push(temple);
      }
    });

    travelData.beaches.forEach((beach) => {
      if (beach.name.toLowerCase().includes(input)) {
        results.push(beach);
      }
    });
  }

  if (!results || results.length === 0) {
    resultsDiv.innerHTML = `
      <div class="card">
        <div class="card-content">
          <h2>No results found</h2>
          <p>Try searching for beach, temple, country, Japan, Australia, Brazil, Sydney, Tokyo, or Bora Bora.</p>
        </div>
      </div>
    `;
    return;
  }
  const shuffled = shuffleArray(results);
  displayResults(shuffled.slice(0, 2));
}

function shuffleArray(array) {
  const shuffled = [...array]; // copy (important)

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    // swap
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function displayResults(results) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  results.forEach((place) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${place.imageUrl}" alt="${place.name}">
      <div class="card-content">
        <h2>${place.name}</h2>
        <p>${place.description}</p>
        <button>Visit</button>
      </div>
    `;

    resultsDiv.appendChild(card);
  });
}

function clearResults() {
  document.getElementById('searchInput').value = '';
  document.getElementById('results').innerHTML = '';
}
