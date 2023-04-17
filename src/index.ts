import express from 'express';
import { PORT } from './constants';
import { meetupRouter } from './routes';
const app = express();

const port = Number(PORT) || 4000;

app.use(express.json());
app.use('/meetup', meetupRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'check health',
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
