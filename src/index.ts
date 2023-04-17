import express from 'express';
import { PORT } from './constants';
const app = express();

const port = Number(PORT) || 4000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
