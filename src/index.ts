import express from 'express';
import { PORT, SIGTERM } from './constants';
import { meetupRouter, userRouter } from './routes';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import YAML from 'yamljs';
import { join } from 'path';
import cookieParser from 'cookie-parser';

import { Strategy as JWTStrategy } from 'passport-jwt';
import { checkAuth } from './middlewares/checkAuth';
import { passportOption } from './config';
const app = express();

const swaggerDocument = YAML.load(join(__dirname, 'swagger.yaml'));

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

const port = Number(PORT) || 4000;

passport.use(new JWTStrategy(passportOption, checkAuth));

app.use(express.json());
app.use(cookieParser());

app.use(
  '/meetup',
  passport.authenticate('jwt', { session: false }),
  meetupRouter
);
app.use('/auth', userRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
