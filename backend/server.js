import express from 'express';
import routes from './routes/routes.js';
import cors from 'cors';
import errorHandler from './middleware/error.js';

const port = process.env.PORT || 8000;

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is at http://localhost:${port}/`);
  console.log(`Press Ctrl-C to close the server`);
});
