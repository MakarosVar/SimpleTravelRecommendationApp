import { Destination } from '../../models/Destination.js';

export async function getAllDestinations(req, res) {
  const {
    search = '',
    type = 'all',
    sort = 'default',
    page = '1',
    limit = '9',
  } = req.query;
  const query = {
    isActive: { $ne: false },
  };
  if (type !== 'all') {
    query.type = type;
  }
  if (search.trim()) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { country: { $regex: search, $options: 'i' } },
      { type: { $regex: search, $options: 'i' } },
      { tags: { $regex: search, $options: 'i' } },
    ];
  }
  let sortOptions = { createdAt: -1 };
  if (sort === 'name') {
    sortOptions = { name: 1 };
  }

  if (sort === 'country') {
    sortOptions = { country: 1 };
  }

  if (sort === 'newest') {
    sortOptions = { createdAt: -1 };
  }
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;
  const filterOptionsQuery = {
    isActive: { $ne: false },
  };
  const types = await Destination.distinct(
    'type',
    filterOptionsQuery,
  );
  const tags = await Destination.distinct('tags', filterOptionsQuery);

  const total = await Destination.countDocuments(query);
  const destinations = await Destination.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNumber);

  res.json({
    items: destinations,
    total,
    page: pageNumber,
    limit: limitNumber,
    totalPages: Math.ceil(total / limitNumber),
    filters: {
      types,
      tags,
    },
  });
}

export async function getDestinationById(req, res) {
  res.json(req.destination);
}
