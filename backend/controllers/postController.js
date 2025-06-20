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

  if (res.status === 400) {
    return res.status(400).json({ message: 'Please include a title' });
    // const error = new Error(`Please include a title`);
    // error.status = 400;
    // return next(error);
  }

  res.status(200).json(data);
};

// @desc Get single post
// @route GET /api/posts/:id
export const getShowFromFilter = (req, res, next) => {
  const id = parseInt(req.params.id);
  // console.log(id);
  // res.json(posts.filter(post => post.id === id));
  const post = posts.find(post => post.id === id);
  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
    // return res
    //   .status(404)
    //   .json({ msg: `A post with the id of ${id} was not found` });
  }
  res.status(200).json(data);
};

// @desc Update post
// @route PUT /api/posts/:id
export const getTopShows = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find(post => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  post.title = req.body.title;
  res.status(200).json(posts);
};
