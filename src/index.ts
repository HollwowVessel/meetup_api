import express from 'express';
import { PORT } from './constants';
import { meetupRouter } from './routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { join } from 'path';
const app = express();
console.log(__dirname);

const swaggerDocument = YAML.load(join(__dirname, 'swagger.yaml'));

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

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
