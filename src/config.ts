import { ACCESS_TOKEN_SECRET } from './constants';
import { ExtractJwt } from 'passport-jwt';

export const passportOption = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ACCESS_TOKEN_SECRET,
};
