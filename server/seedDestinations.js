import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { Destination } from './src/models/Destination.js';
import { destinations } from './src/data/destinations.js';

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Destination.deleteMany();

    await Destination.insertMany(destinations);

    console.log('Destinations seeded');

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

seed();
