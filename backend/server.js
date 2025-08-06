import express from 'express';
import routes from './routes/routes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import errorHandler from './middleware/error.js';

const port = process.env.PORT || 8000;

const app = express();

// Setup cors to accept a request from any IP address
app.use(cors());

// Add ability to process body json
app.use(express.json());

// Add routes
app.use('/users', userRoutes);
app.use('/api', routes);

// Add the errorHandler middleware
app.use(errorHandler);

// Generic error for url that the user tries to visit that isn't covered by the specific routes
app.use((req, res, next) => {
  res.status(404).send('<h1>Error: 404 <br>That Page Does Not Exist</h1>');
});

app.listen(port, () => {
  console.log(`Server is at http://localhost:${port}/`);
  console.log(`Press Ctrl-C to close the server`);
});
