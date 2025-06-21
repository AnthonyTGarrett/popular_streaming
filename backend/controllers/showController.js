// Library provided by streaming Availability to access the API
import * as streamingAvailability from 'streaming-availability';

const saltRounds = 10;

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
  // Testing the passed parameter for being non-empty, alphanumeric only and allowing underscores
  const idTest = /^[a-zA-Z0-9_]+$/;
  const id = req.params.id;

  if (idTest.test(id)) {
    const data = await client.showsApi.getShow({
      id: id,
    });

    res.status(200).json(data);
  } else {
    const error = new Error('That is not a valid ID');
    error.status = 400;
    return next(error);
  }
};

// @desc Get show from Title
// @route POST /api/shows/search/title/:title
export const getShowFromTitle = async (req, res, next) => {
  // Testing the passed parameter for being non-empty, alphanumeric only and allowing spaces
  const titleTest = /^[a-zA-Z0-9 ]+$/;
  const title = req.params.title;

  if (titleTest.test(title)) {
    const data = await client.showsApi.searchShowsByTitle({
      country: 'us',
      title: title,
    });

    res.status(200).json(data);
  } else {
    const error = new Error('That is not a valid Title');
    error.status = 400;
    return next(error);
  }
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

  if (data.length === 0) {
    const error = new Error(
      'That service does not have a top series list available'
    );
    error.status = 404;
    return next(error);
  }

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

  if (data.length === 0) {
    const error = new Error(
      'That service does not have a top movies list available'
    );
    error.status = 404;
    return next(error);
  }
  res.status(200).json(data);
};

// @desc Series and Movies by multiple filters
// @route GET /api/posts/:id
export const getShowFromFilter = async (req, res, next) => {
  // Express.json() converting the body from a string to json object
  const incoming = req.body;

  const data = await client.showsApi.searchShowsByFilters(incoming);
  res.status(200).json(data);
};
