// Library provided by streaming Availability to access the API
import * as streamingAvailability from 'streaming-availability';

const API_KEY = process.env.CLIENT_ID;
const client = new streamingAvailability.Client(
  new streamingAvailability.Configuration({
    apiKey: API_KEY,
  })
);

/**
 * @route GET /api/id
 * @description Retrieves a single show object from the streaming availability API
 * @returns {<object>} 200 - Single show object
 * @returns {object} 404 - Server error if call didn't return a result
 * @returns {object} 400 - Server error if the show ID is not a valid format
 */
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

/**
 * @route GET /api/search/title/:title
 * @description Retrieves an array of up to 20 show objects matching title searches from the API
 * @returns {array<object>} 200 - Array of show objects matching the search title string
 * @returns {object} 404 - Server error if call didn't return a result
 * @returns {object} 400 - Server error if the title isn't valid
 */
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

/**
 * @route GET /api/top/series/:series'
 * @description Retrieves an array of up to 20 show objects of service provided top shows
 * @returns {array<object>} 200 - Array of top show objects
 * @returns {object} 404 - Server error if call didn't return a result
 * @returns {object} 400 - Server error if the service isn't valid
 */
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

/**
 * @route GET /api/top/movies/:movie
 * @description Retrieves an array of up to 20 show objects of service provided top shows
 * @returns {array<object>} 200 - Array of top show objects
 * @returns {object} 404 - Server error if call didn't return a result
 * @returns {object} 400 - Server error if the service isn't valid
 */
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

/**
 * @route POST /api/search/filters/
 * @description Retrieves an array of up to 20 show objects matching the filters
 * @returns {array<object>} 200 - Array of up to 20 show objects matching the given filters
 * @returns {object} 404 - Server error if call didn't return a result
 * @returns {object} 400 - Server error if the service isn't valid
 */
export const getShowFromFilter = async (req, res, next) => {
  const incoming = req.body;

  let totalData = [];
  let pages = 0;
  const PAGES_TO_FETCH = 1;

  // Written in the format of paging just in case I want to increase the amount of results found with each filter call
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

/**
 * @route GET /api/genres/getAllGenres
 * @description Retrieves all possible genres for shows
 * @returns {array<object>} 200 - Array of all genres as objects
 * @returns {object} 404 - Server error if call didn't return a result
 */
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
