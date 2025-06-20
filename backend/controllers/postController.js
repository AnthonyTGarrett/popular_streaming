import * as streamingAvailability from 'streaming-availability';
const API_KEY = process.env.CLIENT_ID;
const client = new streamingAvailability.Client(
  new streamingAvailability.Configuration({
    apiKey: API_KEY,
  })
);

// tt0068646

// @desc Get show by ID
// @route GET /api/shows/id
export const getShowFromId = async (req, res, next) => {
  const id = req.params.id;

  const data = await client.showsApi.getShow({
    id: id,
  });

  res.status(200).json(data);
};

// @desc Get show from Title
// @route POST /api/shows/search/title/:title
export const getShowFromTitle = async (req, res, next) => {
  const title = req.params.title;
  const data = await client.showsApi.searchShowsByTitle({
    country: 'us',
    title: title,
  });

  res.status(200).json(data);
};

// @desc Get Top Series by Service
// @route PUT /api/shows/top/series/:service
export const getTopSeries = async (req, res, next) => {
  const service = req.params.series;

  const data = await client.showsApi.getTopShows({
    country: 'us',
    service: service,
    showType: 'series',
  });

  res.status(200).json(data);
};

// @desc Get Top Movies by Service
// @route PUT /api/shows/top/movies/:service
export const getTopMovies = async (req, res, next) => {
  const service = req.params.movie;

  const data = await client.showsApi.getTopShows({
    country: 'us',
    service: service,
    showType: 'movie',
  });

  res.status(200).json(data);
};

// @desc Series and Movies by multiple filters
// @route GET /api/posts/:id
export const getShowFromFilter = async (req, res, next) => {
  const incoming = req.body;

  const data = await client.showsApi.searchShowsByFilters(incoming);

  res.status(200).json(data);
};
