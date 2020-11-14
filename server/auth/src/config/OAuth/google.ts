import { BadRequestError, ResourceNotFoundError } from '@aashas/common';
import { use } from 'passport';
import { Strategy as googleStrategy } from 'passport-google-oauth20';
import config from '..';

if (!config.googleClientID || !config.googleClientSecret) {
  throw new ResourceNotFoundError(
    'Oauth is currently down, plz try again later'
  );
}
use(
  new googleStrategy(
    {
      clientID: config.googleClientID,
      clientSecret: config.googleClientSecret,
      callbackURL: 'http://aashas.com/api/v1/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      //  TODO : create user from oauth

      const user = profile;
      return cb(undefined, user);
    }
  )
);
