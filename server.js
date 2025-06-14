import express from 'express';
// import routes from './routes/routes.js';
// import errorHandler from './middleware/error.js';
import path from 'path';
const port = process.env.PORT || 8000;

const __dirname = import.meta.dirname;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Press Ctrl-C to close the server`);
});
