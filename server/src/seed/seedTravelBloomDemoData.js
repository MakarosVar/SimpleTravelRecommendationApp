import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Destination } from '../models/Destination.js';
import { Package } from '../models/Package.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error('Missing MONGO_URI or MONGODB_URI in your environment.');
}

const seedDestinations = [
  {
    "name": "Santorini Caldera",
    "country": "Greece",
    "type": "island",
    "description": "Santorini Caldera is a demo destination in Greece, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "romantic",
      "luxury",
      "sunset",
      "couples"
    ],
    "isActive": true
  },
  {
    "name": "Athens Acropolis Quarter",
    "country": "Greece",
    "type": "historical",
    "description": "Athens Acropolis Quarter is a demo destination in Greece, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "historic",
      "city",
      "museum",
      "culture"
    ],
    "isActive": true
  },
  {
    "name": "Crete South Coast",
    "country": "Greece",
    "type": "beach",
    "description": "Crete South Coast is a demo destination in Greece, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "family",
      "road-trip",
      "food",
      "nature"
    ],
    "isActive": true
  },
  {
    "name": "Meteora Monasteries",
    "country": "Greece",
    "type": "nature",
    "description": "Meteora Monasteries is a demo destination in Greece, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "historic",
      "hiking",
      "spiritual",
      "scenic"
    ],
    "isActive": true
  },
  {
    "name": "Rhodes Old Town",
    "country": "Greece",
    "type": "historical",
    "description": "Rhodes Old Town is a demo destination in Greece, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "medieval",
      "city",
      "culture",
      "walking"
    ],
    "isActive": true
  },
  {
    "name": "Naxos Villages",
    "country": "Greece",
    "type": "island",
    "description": "Naxos Villages is a demo destination in Greece, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "family",
      "food",
      "beach",
      "local"
    ],
    "isActive": true
  },
  {
    "name": "Corfu Old Town",
    "country": "Greece",
    "type": "city",
    "description": "Corfu Old Town is a demo destination in Greece, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "venetian",
      "culture",
      "food",
      "romantic"
    ],
    "isActive": true
  },
  {
    "name": "Zagori Stone Villages",
    "country": "Greece",
    "type": "mountain",
    "description": "Zagori Stone Villages is a demo destination in Greece, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "hiking",
      "nature",
      "slow-travel",
      "traditional"
    ],
    "isActive": true
  },
  {
    "name": "Mykonos Beach Clubs",
    "country": "Greece",
    "type": "beach",
    "description": "Mykonos Beach Clubs is a demo destination in Greece, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "nightlife",
      "luxury",
      "island",
      "friends"
    ],
    "isActive": false
  },
  {
    "name": "Thessaloniki Waterfront",
    "country": "Greece",
    "type": "city",
    "description": "Thessaloniki Waterfront is a demo destination in Greece, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "food",
      "nightlife",
      "history",
      "urban"
    ],
    "isActive": true
  },
  {
    "name": "Rome Ancient Core",
    "country": "Italy",
    "type": "historical",
    "description": "Rome Ancient Core is a demo destination in Italy, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "historic",
      "museum",
      "food",
      "city"
    ],
    "isActive": true
  },
  {
    "name": "Florence Renaissance Walk",
    "country": "Italy",
    "type": "city",
    "description": "Florence Renaissance Walk is a demo destination in Italy, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "art",
      "museum",
      "romantic",
      "culture"
    ],
    "isActive": true
  },
  {
    "name": "Amalfi Coast Villages",
    "country": "Italy",
    "type": "coast",
    "description": "Amalfi Coast Villages is a demo destination in Italy, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "romantic",
      "luxury",
      "road-trip",
      "scenic"
    ],
    "isActive": true
  },
  {
    "name": "Venice Canals",
    "country": "Italy",
    "type": "city",
    "description": "Venice Canals is a demo destination in Italy, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "romantic",
      "historic",
      "walking",
      "culture"
    ],
    "isActive": true
  },
  {
    "name": "Sicily East Coast",
    "country": "Italy",
    "type": "island",
    "description": "Sicily East Coast is a demo destination in Italy, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "food",
      "volcano",
      "beach",
      "culture"
    ],
    "isActive": true
  },
  {
    "name": "Cinque Terre Trails",
    "country": "Italy",
    "type": "nature",
    "description": "Cinque Terre Trails is a demo destination in Italy, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "hiking",
      "coast",
      "scenic",
      "villages"
    ],
    "isActive": true
  },
  {
    "name": "Paris Left Bank",
    "country": "France",
    "type": "city",
    "description": "Paris Left Bank is a demo destination in France, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "romantic",
      "museum",
      "food",
      "walking"
    ],
    "isActive": true
  },
  {
    "name": "Provence Lavender Route",
    "country": "France",
    "type": "nature",
    "description": "Provence Lavender Route is a demo destination in France, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "slow-travel",
      "road-trip",
      "photography",
      "villages"
    ],
    "isActive": true
  },
  {
    "name": "Nice Promenade",
    "country": "France",
    "type": "beach",
    "description": "Nice Promenade is a demo destination in France, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "coast",
      "relaxed",
      "food",
      "sun"
    ],
    "isActive": true
  },
  {
    "name": "Loire Valley Chateaux",
    "country": "France",
    "type": "historical",
    "description": "Loire Valley Chateaux is a demo destination in France, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "castles",
      "wine",
      "culture",
      "road-trip"
    ],
    "isActive": true
  },
  {
    "name": "Chamonix Alpine Valley",
    "country": "France",
    "type": "mountain",
    "description": "Chamonix Alpine Valley is a demo destination in France, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "adventure",
      "hiking",
      "ski",
      "nature"
    ],
    "isActive": true
  },
  {
    "name": "Barcelona Gothic Quarter",
    "country": "Spain",
    "type": "city",
    "description": "Barcelona Gothic Quarter is a demo destination in Spain, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "architecture",
      "food",
      "nightlife",
      "walking"
    ],
    "isActive": true
  },
  {
    "name": "Granada Alhambra",
    "country": "Spain",
    "type": "historical",
    "description": "Granada Alhambra is a demo destination in Spain, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "historic",
      "architecture",
      "culture",
      "romantic"
    ],
    "isActive": true
  },
  {
    "name": "Mallorca North Coast",
    "country": "Spain",
    "type": "island",
    "description": "Mallorca North Coast is a demo destination in Spain, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "beach",
      "family",
      "cycling",
      "scenic"
    ],
    "isActive": true
  },
  {
    "name": "Seville Old City",
    "country": "Spain",
    "type": "city",
    "description": "Seville Old City is a demo destination in Spain, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "culture",
      "food",
      "music",
      "historic"
    ],
    "isActive": false
  },
  {
    "name": "Canary Islands Volcano Trails",
    "country": "Spain",
    "type": "nature",
    "description": "Canary Islands Volcano Trails is a demo destination in Spain, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "hiking",
      "volcano",
      "adventure",
      "sun"
    ],
    "isActive": true
  },
  {
    "name": "Lisbon Hills",
    "country": "Portugal",
    "type": "city",
    "description": "Lisbon Hills is a demo destination in Portugal, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "food",
      "viewpoints",
      "culture",
      "walking"
    ],
    "isActive": true
  },
  {
    "name": "Porto Riverside",
    "country": "Portugal",
    "type": "city",
    "description": "Porto Riverside is a demo destination in Portugal, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "wine",
      "food",
      "romantic",
      "historic"
    ],
    "isActive": true
  },
  {
    "name": "Algarve Golden Cliffs",
    "country": "Portugal",
    "type": "beach",
    "description": "Algarve Golden Cliffs is a demo destination in Portugal, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "family",
      "coast",
      "sun",
      "relaxed"
    ],
    "isActive": true
  },
  {
    "name": "Madeira Levada Trails",
    "country": "Portugal",
    "type": "nature",
    "description": "Madeira Levada Trails is a demo destination in Portugal, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "hiking",
      "island",
      "adventure",
      "green"
    ],
    "isActive": true
  },
  {
    "name": "Istanbul Historic Peninsula",
    "country": "Turkey",
    "type": "city",
    "description": "Istanbul Historic Peninsula is a demo destination in Turkey, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "historic",
      "food",
      "bazaar",
      "culture"
    ],
    "isActive": true
  },
  {
    "name": "Cappadocia Valleys",
    "country": "Turkey",
    "type": "nature",
    "description": "Cappadocia Valleys is a demo destination in Turkey, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "balloons",
      "hiking",
      "romantic",
      "photography"
    ],
    "isActive": true
  },
  {
    "name": "Antalya Old Harbour",
    "country": "Turkey",
    "type": "beach",
    "description": "Antalya Old Harbour is a demo destination in Turkey, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "coast",
      "family",
      "historic",
      "sun"
    ],
    "isActive": true
  },
  {
    "name": "Ephesus Ancient City",
    "country": "Turkey",
    "type": "historical",
    "description": "Ephesus Ancient City is a demo destination in Turkey, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "ancient",
      "museum",
      "culture",
      "walking"
    ],
    "isActive": true
  },
  {
    "name": "Dubrovnik City Walls",
    "country": "Croatia",
    "type": "historical",
    "description": "Dubrovnik City Walls is a demo destination in Croatia, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "coast",
      "walking",
      "historic",
      "scenic"
    ],
    "isActive": true
  },
  {
    "name": "Split Diocletian Palace",
    "country": "Croatia",
    "type": "city",
    "description": "Split Diocletian Palace is a demo destination in Croatia, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "historic",
      "food",
      "island-hopping",
      "culture"
    ],
    "isActive": true
  },
  {
    "name": "Hvar Island Bays",
    "country": "Croatia",
    "type": "island",
    "description": "Hvar Island Bays is a demo destination in Croatia, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "beach",
      "nightlife",
      "sailing",
      "luxury"
    ],
    "isActive": true
  },
  {
    "name": "Plitvice Lakes",
    "country": "Croatia",
    "type": "nature",
    "description": "Plitvice Lakes is a demo destination in Croatia, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "lakes",
      "hiking",
      "photography",
      "family"
    ],
    "isActive": true
  },
  {
    "name": "Prague Old Town",
    "country": "Czech Republic",
    "type": "city",
    "description": "Prague Old Town is a demo destination in Czech Republic, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "historic",
      "budget",
      "walking",
      "romantic"
    ],
    "isActive": true
  },
  {
    "name": "Vienna Museum Ring",
    "country": "Austria",
    "type": "city",
    "description": "Vienna Museum Ring is a demo destination in Austria, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "museum",
      "classical",
      "culture",
      "food"
    ],
    "isActive": true
  },
  {
    "name": "Salzburg Alpine Old Town",
    "country": "Austria",
    "type": "mountain",
    "description": "Salzburg Alpine Old Town is a demo destination in Austria, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "music",
      "historic",
      "nature",
      "slow-travel"
    ],
    "isActive": true
  },
  {
    "name": "Budapest Thermal District",
    "country": "Hungary",
    "type": "city",
    "description": "Budapest Thermal District is a demo destination in Hungary, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "wellness",
      "nightlife",
      "historic",
      "budget"
    ],
    "isActive": true
  },
  {
    "name": "Amsterdam Canal Belt",
    "country": "Netherlands",
    "type": "city",
    "description": "Amsterdam Canal Belt is a demo destination in Netherlands, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "walking",
      "museum",
      "cycling",
      "romantic"
    ],
    "isActive": true
  },
  {
    "name": "Bruges Medieval Center",
    "country": "Belgium",
    "type": "historical",
    "description": "Bruges Medieval Center is a demo destination in Belgium, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "medieval",
      "romantic",
      "food",
      "walking"
    ],
    "isActive": true
  },
  {
    "name": "Berlin Creative Districts",
    "country": "Germany",
    "type": "city",
    "description": "Berlin Creative Districts is a demo destination in Germany, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "nightlife",
      "history",
      "art",
      "urban"
    ],
    "isActive": true
  },
  {
    "name": "Munich Bavarian Route",
    "country": "Germany",
    "type": "city",
    "description": "Munich Bavarian Route is a demo destination in Germany, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "food",
      "beer",
      "culture",
      "day-trips"
    ],
    "isActive": true
  },
  {
    "name": "Swiss Alps Panorama",
    "country": "Switzerland",
    "type": "mountain",
    "description": "Swiss Alps Panorama is a demo destination in Switzerland, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "luxury",
      "hiking",
      "scenic",
      "nature"
    ],
    "isActive": true
  },
  {
    "name": "Lucerne Lakefront",
    "country": "Switzerland",
    "type": "nature",
    "description": "Lucerne Lakefront is a demo destination in Switzerland, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "lake",
      "romantic",
      "walking",
      "mountain"
    ],
    "isActive": true
  },
  {
    "name": "Reykjavik Golden Circle",
    "country": "Iceland",
    "type": "nature",
    "description": "Reykjavik Golden Circle is a demo destination in Iceland, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "adventure",
      "road-trip",
      "waterfalls",
      "volcano"
    ],
    "isActive": true
  },
  {
    "name": "Norway Fjord Route",
    "country": "Norway",
    "type": "nature",
    "description": "Norway Fjord Route is a demo destination in Norway, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "scenic",
      "road-trip",
      "hiking",
      "cruise"
    ],
    "isActive": true
  },
  {
    "name": "Marrakech Medina",
    "country": "Morocco",
    "type": "city",
    "description": "Marrakech Medina is a demo destination in Morocco, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "bazaar",
      "culture",
      "food",
      "photography"
    ],
    "isActive": true
  },
  {
    "name": "Sahara Desert Camp",
    "country": "Morocco",
    "type": "adventure",
    "description": "Sahara Desert Camp is a demo destination in Morocco, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "desert",
      "romantic",
      "stargazing",
      "slow-travel"
    ],
    "isActive": true
  },
  {
    "name": "Cairo Ancient Wonders",
    "country": "Egypt",
    "type": "historical",
    "description": "Cairo Ancient Wonders is a demo destination in Egypt, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "ancient",
      "museum",
      "culture",
      "iconic"
    ],
    "isActive": false
  },
  {
    "name": "Luxor Nile Temples",
    "country": "Egypt",
    "type": "temple",
    "description": "Luxor Nile Temples is a demo destination in Egypt, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "ancient",
      "river",
      "culture",
      "historic"
    ],
    "isActive": true
  },
  {
    "name": "Kyoto Temple Path",
    "country": "Japan",
    "type": "temple",
    "description": "Kyoto Temple Path is a demo destination in Japan, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "culture",
      "walking",
      "spiritual",
      "photography"
    ],
    "isActive": true
  },
  {
    "name": "Tokyo Neighborhood Explorer",
    "country": "Japan",
    "type": "city",
    "description": "Tokyo Neighborhood Explorer is a demo destination in Japan, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "food",
      "shopping",
      "nightlife",
      "urban"
    ],
    "isActive": true
  },
  {
    "name": "Osaka Food Streets",
    "country": "Japan",
    "type": "food",
    "description": "Osaka Food Streets is a demo destination in Japan, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "street-food",
      "city",
      "friends",
      "budget"
    ],
    "isActive": true
  },
  {
    "name": "Bali Ubud Retreat",
    "country": "Indonesia",
    "type": "nature",
    "description": "Bali Ubud Retreat is a demo destination in Indonesia, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "wellness",
      "yoga",
      "romantic",
      "green"
    ],
    "isActive": true
  },
  {
    "name": "Bali South Beaches",
    "country": "Indonesia",
    "type": "beach",
    "description": "Bali South Beaches is a demo destination in Indonesia, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "surf",
      "sun",
      "friends",
      "relaxed"
    ],
    "isActive": true
  },
  {
    "name": "Bangkok Markets",
    "country": "Thailand",
    "type": "city",
    "description": "Bangkok Markets is a demo destination in Thailand, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "food",
      "nightlife",
      "budget",
      "culture"
    ],
    "isActive": true
  },
  {
    "name": "Chiang Mai Mountain Temples",
    "country": "Thailand",
    "type": "temple",
    "description": "Chiang Mai Mountain Temples is a demo destination in Thailand, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "spiritual",
      "mountain",
      "culture",
      "slow-travel"
    ],
    "isActive": true
  },
  {
    "name": "Phuket Island Escape",
    "country": "Thailand",
    "type": "island",
    "description": "Phuket Island Escape is a demo destination in Thailand, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "beach",
      "family",
      "luxury",
      "sun"
    ],
    "isActive": false
  },
  {
    "name": "New York Urban Icons",
    "country": "United States",
    "type": "city",
    "description": "New York Urban Icons is a demo destination in United States, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "museum",
      "food",
      "shopping",
      "urban"
    ],
    "isActive": true
  },
  {
    "name": "California Coast Drive",
    "country": "United States",
    "type": "coast",
    "description": "California Coast Drive is a demo destination in United States, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "road-trip",
      "scenic",
      "beach",
      "adventure"
    ],
    "isActive": true
  },
  {
    "name": "Grand Canyon Rim",
    "country": "United States",
    "type": "nature",
    "description": "Grand Canyon Rim is a demo destination in United States, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "hiking",
      "iconic",
      "family",
      "photography"
    ],
    "isActive": true
  },
  {
    "name": "Maui Ocean Road",
    "country": "United States",
    "type": "island",
    "description": "Maui Ocean Road is a demo destination in United States, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "beach",
      "road-trip",
      "romantic",
      "nature"
    ],
    "isActive": true
  },
  {
    "name": "Vancouver Nature City",
    "country": "Canada",
    "type": "city",
    "description": "Vancouver Nature City is a demo destination in Canada, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "nature",
      "food",
      "hiking",
      "urban"
    ],
    "isActive": true
  },
  {
    "name": "Banff Lake Trails",
    "country": "Canada",
    "type": "mountain",
    "description": "Banff Lake Trails is a demo destination in Canada, useful for testing discovery search, filtering, sorting, pagination, and travel plan creation flows.",
    "imageUrl": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "hiking",
      "lake",
      "scenic",
      "adventure"
    ],
    "isActive": true
  }
];

const seedPackages = [
  {
    "title": "Greek Island Starter Plan",
    "description": "Greek Island Starter Plan is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Relaxed",
    "duration": "5 days",
    "destinationNames": [
      "Santorini Caldera",
      "Naxos Villages",
      "Crete South Coast"
    ],
    "status": "published"
  },
  {
    "title": "Classical Greece Culture Route",
    "description": "Classical Greece Culture Route is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Cultural",
    "duration": "7 days",
    "destinationNames": [
      "Athens Acropolis Quarter",
      "Meteora Monasteries",
      "Rhodes Old Town"
    ],
    "status": "published"
  },
  {
    "title": "Greek Food and Coast Escape",
    "description": "Greek Food and Coast Escape is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Food",
    "duration": "6 days",
    "destinationNames": [
      "Thessaloniki Waterfront",
      "Corfu Old Town",
      "Crete South Coast"
    ],
    "status": "published"
  },
  {
    "title": "Italian Romance Highlights",
    "description": "Italian Romance Highlights is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Romantic",
    "duration": "7 days",
    "destinationNames": [
      "Venice Canals",
      "Florence Renaissance Walk",
      "Amalfi Coast Villages"
    ],
    "status": "published"
  },
  {
    "title": "Italy History and Food Loop",
    "description": "Italy History and Food Loop is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Cultural",
    "duration": "8 days",
    "destinationNames": [
      "Rome Ancient Core",
      "Sicily East Coast",
      "Cinque Terre Trails"
    ],
    "status": "published"
  },
  {
    "title": "French Slow Travel Week",
    "description": "French Slow Travel Week is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Relaxed",
    "duration": "7 days",
    "destinationNames": [
      "Paris Left Bank",
      "Provence Lavender Route",
      "Loire Valley Chateaux"
    ],
    "status": "published"
  },
  {
    "title": "French Alps and Riviera Mix",
    "description": "French Alps and Riviera Mix is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Adventure",
    "duration": "6 days",
    "destinationNames": [
      "Chamonix Alpine Valley",
      "Nice Promenade",
      "Provence Lavender Route"
    ],
    "status": "published"
  },
  {
    "title": "Spain City and Island Combo",
    "description": "Spain City and Island Combo is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Urban",
    "duration": "6 days",
    "destinationNames": [
      "Barcelona Gothic Quarter",
      "Seville Old City",
      "Mallorca North Coast"
    ],
    "status": "published"
  },
  {
    "title": "Andalusian Culture Route",
    "description": "Andalusian Culture Route is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Cultural",
    "duration": "5 days",
    "destinationNames": [
      "Granada Alhambra",
      "Seville Old City",
      "Barcelona Gothic Quarter"
    ],
    "status": "published"
  },
  {
    "title": "Portugal Coast and City",
    "description": "Portugal Coast and City is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Relaxed",
    "duration": "6 days",
    "destinationNames": [
      "Lisbon Hills",
      "Porto Riverside",
      "Algarve Golden Cliffs"
    ],
    "status": "published"
  },
  {
    "title": "Madeira Active Nature Break",
    "description": "Madeira Active Nature Break is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Adventure",
    "duration": "5 days",
    "destinationNames": [
      "Madeira Levada Trails",
      "Algarve Golden Cliffs",
      "Lisbon Hills"
    ],
    "status": "published"
  },
  {
    "title": "Turkey Heritage Explorer",
    "description": "Turkey Heritage Explorer is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Cultural",
    "duration": "8 days",
    "destinationNames": [
      "Istanbul Historic Peninsula",
      "Cappadocia Valleys",
      "Ephesus Ancient City"
    ],
    "status": "published"
  },
  {
    "title": "Turkey Coast and Valleys",
    "description": "Turkey Coast and Valleys is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Romantic",
    "duration": "6 days",
    "destinationNames": [
      "Cappadocia Valleys",
      "Antalya Old Harbour",
      "Istanbul Historic Peninsula"
    ],
    "status": "published"
  },
  {
    "title": "Croatia Island and Walls",
    "description": "Croatia Island and Walls is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Relaxed",
    "duration": "7 days",
    "destinationNames": [
      "Dubrovnik City Walls",
      "Split Diocletian Palace",
      "Hvar Island Bays"
    ],
    "status": "published"
  },
  {
    "title": "Central Europe First Timer",
    "description": "Central Europe First Timer is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Urban",
    "duration": "8 days",
    "destinationNames": [
      "Prague Old Town",
      "Vienna Museum Ring",
      "Budapest Thermal District"
    ],
    "status": "published"
  },
  {
    "title": "Alpine Lakes and Old Towns",
    "description": "Alpine Lakes and Old Towns is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Nature",
    "duration": "6 days",
    "destinationNames": [
      "Swiss Alps Panorama",
      "Lucerne Lakefront",
      "Salzburg Alpine Old Town"
    ],
    "status": "published"
  },
  {
    "title": "Nordic Nature Snapshot",
    "description": "Nordic Nature Snapshot is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Adventure",
    "duration": "7 days",
    "destinationNames": [
      "Reykjavik Golden Circle",
      "Norway Fjord Route",
      "Banff Lake Trails"
    ],
    "status": "published"
  },
  {
    "title": "Morocco Culture and Desert",
    "description": "Morocco Culture and Desert is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Cultural",
    "duration": "6 days",
    "destinationNames": [
      "Marrakech Medina",
      "Sahara Desert Camp",
      "Cairo Ancient Wonders"
    ],
    "status": "published"
  },
  {
    "title": "Egypt Ancient Route",
    "description": "Egypt Ancient Route is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Cultural",
    "duration": "5 days",
    "destinationNames": [
      "Cairo Ancient Wonders",
      "Luxor Nile Temples",
      "Marrakech Medina"
    ],
    "status": "published"
  },
  {
    "title": "Japan City and Temple Flow",
    "description": "Japan City and Temple Flow is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Cultural",
    "duration": "7 days",
    "destinationNames": [
      "Kyoto Temple Path",
      "Tokyo Neighborhood Explorer",
      "Osaka Food Streets"
    ],
    "status": "published"
  },
  {
    "title": "Thailand Budget Discovery",
    "description": "Thailand Budget Discovery is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Budget",
    "duration": "7 days",
    "destinationNames": [
      "Bangkok Markets",
      "Chiang Mai Mountain Temples",
      "Phuket Island Escape"
    ],
    "status": "published"
  },
  {
    "title": "Bali Wellness and Surf",
    "description": "Bali Wellness and Surf is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Wellness",
    "duration": "6 days",
    "destinationNames": [
      "Bali Ubud Retreat",
      "Bali South Beaches",
      "Phuket Island Escape"
    ],
    "status": "published"
  },
  {
    "title": "North America City and Nature",
    "description": "North America City and Nature is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Urban",
    "duration": "8 days",
    "destinationNames": [
      "New York Urban Icons",
      "Vancouver Nature City",
      "Grand Canyon Rim"
    ],
    "status": "published"
  },
  {
    "title": "Pacific Road Trip Inspiration",
    "description": "Pacific Road Trip Inspiration is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Adventure",
    "duration": "9 days",
    "destinationNames": [
      "California Coast Drive",
      "Maui Ocean Road",
      "Vancouver Nature City"
    ],
    "status": "published"
  },
  {
    "title": "Canada Mountain Escape",
    "description": "Canada Mountain Escape is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Nature",
    "duration": "5 days",
    "destinationNames": [
      "Banff Lake Trails",
      "Vancouver Nature City",
      "Lucerne Lakefront"
    ],
    "status": "published"
  },
  {
    "title": "Luxury Mediterranean Sampler",
    "description": "Luxury Mediterranean Sampler is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Luxury",
    "duration": "10 days",
    "destinationNames": [
      "Santorini Caldera",
      "Amalfi Coast Villages",
      "Hvar Island Bays"
    ],
    "status": "published"
  },
  {
    "title": "Family Friendly Sun Break",
    "description": "Family Friendly Sun Break is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Family",
    "duration": "7 days",
    "destinationNames": [
      "Crete South Coast",
      "Algarve Golden Cliffs",
      "Phuket Island Escape"
    ],
    "status": "published"
  },
  {
    "title": "Museum and Historic Capitals",
    "description": "Museum and Historic Capitals is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Cultural",
    "duration": "9 days",
    "destinationNames": [
      "Athens Acropolis Quarter",
      "Rome Ancient Core",
      "Vienna Museum Ring"
    ],
    "status": "published"
  },
  {
    "title": "Draft: Admin Test Package",
    "description": "Draft: Admin Test Package is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Experimental",
    "duration": "4 days",
    "destinationNames": [
      "Paris Left Bank",
      "Amsterdam Canal Belt"
    ],
    "status": "draft"
  },
  {
    "title": "Draft: Unpublished Adventure Idea",
    "description": "Draft: Unpublished Adventure Idea is a demo package for testing package discovery, travel style filtering, search, pagination, and create-plan-from-package flows.",
    "travelStyle": "Adventure",
    "duration": "6 days",
    "destinationNames": [
      "Norway Fjord Route",
      "Reykjavik Golden Circle"
    ],
    "status": "draft"
  }
];

function shouldReset() {
  return process.argv.includes('--reset');
}

async function upsertDestinations() {
  const destinationMap = new Map();

  for (const destination of seedDestinations) {
    const savedDestination = await Destination.findOneAndUpdate(
      {
        name: destination.name,
        country: destination.country,
      },
      destination,
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );

    destinationMap.set(savedDestination.name, savedDestination._id);
  }

  return destinationMap;
}

async function upsertPackages(destinationMap) {
  let savedCount = 0;

  for (const packageTemplate of seedPackages) {
    const { destinationNames, ...packageData } = packageTemplate;

    const destinationIds = destinationNames
      .map((destinationName) => destinationMap.get(destinationName))
      .filter(Boolean);

    if (destinationIds.length === 0) {
      console.warn(
        `Skipped package "${packageData.title}" because no destination ids were found.`,
      );
      continue;
    }

    await Package.findOneAndUpdate(
      { title: packageData.title },
      {
        ...packageData,
        destinations: destinationIds,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );

    savedCount += 1;
  }

  return savedCount;
}

async function resetSeededData() {
  const destinationNames = seedDestinations.map(
    (destination) => destination.name,
  );
  const packageTitles = seedPackages.map((packageItem) => packageItem.title);

  await Package.deleteMany({ title: { $in: packageTitles } });
  await Destination.deleteMany({ name: { $in: destinationNames } });
}

async function seedTravelBloomDemoData() {
  await mongoose.connect(MONGO_URI);

  if (shouldReset()) {
    await resetSeededData();
    console.log('Removed previous TravelBloom demo seed data.');
  }

  const destinationMap = await upsertDestinations();
  const packageCount = await upsertPackages(destinationMap);

  const activeDestinationCount = seedDestinations.filter(
    (destination) => destination.isActive !== false,
  ).length;
  const inactiveDestinationCount =
    seedDestinations.length - activeDestinationCount;
  const publishedPackageCount = seedPackages.filter(
    (packageItem) => packageItem.status === 'published',
  ).length;
  const draftPackageCount = seedPackages.length - publishedPackageCount;

  console.log('TravelBloom demo seed complete.');
  console.log(`Destinations upserted: ${seedDestinations.length}`);
  console.log(`Active destinations: ${activeDestinationCount}`);
  console.log(`Inactive destinations: ${inactiveDestinationCount}`);
  console.log(`Packages upserted: ${packageCount}`);
  console.log(`Published packages: ${publishedPackageCount}`);
  console.log(`Draft packages: ${draftPackageCount}`);

  await mongoose.disconnect();
}

seedTravelBloomDemoData().catch(async (error) => {
  console.error('TravelBloom demo seed failed:', error);
  await mongoose.disconnect();
  process.exit(1);
});
