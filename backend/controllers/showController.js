// Library provided by streaming Availability to access the API
import * as streamingAvailability from 'streaming-availability';

const API_KEY = process.env.CLIENT_ID;
const client = new streamingAvailability.Client(
  new streamingAvailability.Configuration({
    apiKey: API_KEY,
  })
);

// @desc Get show by ID
// @route GET /api/id

export const getShowFromId = async (req, res, next) => {
  // Testing the passed parameter for being non-empty, alphanumeric only and allowing underscores
  const idTest = /^[a-zA-Z0-9_]+$/;
  const id = req.params.id;

  if (idTest.test(id)) {
    try {
      const data = await client.showsApi.getShow({
        id: id,
      });
      res.status(200).json(data);
    } catch (error) {
      error.message = 'That ID did not return a result';
      error.status = 404;
      return next(error);
    }
  } else {
    const error = new Error('That is not a valid ID');
    error.status = 400;
    return next(error);
  }
};

// @desc Get show from Title
// @route POST /api/search/title/:title

export const getShowFromTitle = async (req, res, next) => {
  // Testing the passed parameter for being non-empty, alphanumeric only and allowing spaces
  const titleTest = /^[a-zA-Z0-9 ]+$/;
  const title = req.params.title;

  if (titleTest.test(title)) {
    try {
      const data = await client.showsApi.searchShowsByTitle({
        country: 'us',
        title: title,
      });
      if (data.length === 0) {
        const error = new Error('That title produced no results');
        error.status = 404;
        return next(error);
      }
      res.status(200).json(data);
    } catch (error) {
      error.message = 'That is not a valid Title';
      error.status = 400;
      return next(error);
    }
  } else {
    const error = new Error('That is not a valid Title');
    error.status = 400;
    return next(error);
  }
};

// @desc Get Top Series by Service
// @route PUT /api/top/series/:service

export const getTopSeries = async (req, res, next) => {
  const serviceTest = /^[a-zA-Z0-9]+$/;
  const service = req.params.series;

  if (serviceTest.test(service)) {
    try {
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
    } catch (error) {
      error.message = 'That service does not have a top series list available';
      error.status = 404;
      return next(error);
    }
  } else {
    const error = new Error('That is not a valid service.');
    error.status = 400;
    return next(error);
  }
};

// @desc Get Top Movies by Service
// @route PUT /api/top/movies/:service

export const getTopMovies = async (req, res, next) => {
  const serviceTest = /^[a-zA-Z0-9]+$/;
  const service = req.params.movie;

  if (serviceTest.test(service)) {
    try {
      const data = await client.showsApi.getTopShows({
        country: 'us',
        service: service,
        showType: 'movie',
      });
      if (data.length === 0) {
        const error = new Error(
          'That service does not have a top movie list available'
        );
        error.status = 404;
        return next(error);
      }
      res.status(200).json(data);
    } catch (error) {
      error.message = 'That service does not have a top movie list available';
      error.status = 404;
      return next(error);
    }
  } else {
    const error = new Error('That is not a valid service.');
    error.status = 400;
    return next(error);
  }
};

// @desc Series and Movies by multiple filters
// @route GET /api/search/filters
export const getShowFromFilter = async (req, res, next) => {
  const incoming = req.body;

  let totalData = [];
  let pages = 0;
  const PAGES_TO_FETCH = 1;

  try {
    let response = await client.showsApi.searchShowsByFilters(incoming);
    while (response.hasMore && pages < PAGES_TO_FETCH) {
      response = await client.showsApi.searchShowsByFilters(incoming);
      totalData = totalData.concat(response.shows);
      incoming.cursor = response.nextCursor;
      pages++;
    }

    res.status(200).json(totalData);
  } catch (error) {
    // error.message = 'No results found';
    error.status = 404;
    return next(error);
  }
};

export const getAllGenres = async (req, res, next) => {
  try {
    const data = await client.genresApi.getGenres({
      outputLanguage: 'en',
    });
    res.status(200).json(data);
  } catch (error) {
    error.message = 'No genres found';
    error.status = 404;
    return next(error);
  }
};
