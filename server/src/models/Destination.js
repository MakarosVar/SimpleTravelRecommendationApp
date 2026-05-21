import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema(
  {
    name: String,
    country: String,
    type: String,
    description: String,
    imageUrl: String,
    tags: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Destination = mongoose.model(
  'Destination',
  destinationSchema,
);
