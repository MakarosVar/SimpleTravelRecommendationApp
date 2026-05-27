import mongoose from 'mongoose';

const tripItemSchema = new mongoose.Schema(
  {
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: true,
    },
    note: {
      type: String,
      default: '',
      trim: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  },
);

const tripSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      default: 'My Travel Plan',
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [tripItemSchema],
  },
  {
    timestamps: true,
  },
);

export const Trip = mongoose.model('Trip', tripSchema);
