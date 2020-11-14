import { BadRequestError, ResourceNotFoundError } from '@aashas/common';
import { use } from 'passport';

import { Strategy as facebookStrategy } from 'passport-facebook';
import config from '..';

if (!config.facebookClientID || !config.facebookClientSecret) {
  throw new ResourceNotFoundError(
    'Oauth is currently down, plz try again later'
  );
}

use(
  new facebookStrategy(
    {
      clientID: config.facebookClientID,
      clientSecret: config.facebookClientSecret,
      callbackURL: 'https://aashas.com/api/v1/auth/facebook/callback',
      profileFields: [
        'id',
        'email',
        'gender',
        'link',
        'locale',
        'name',
        'timezone',
        'updated_time',
        'verified',
      ],
    },
    function (accessToken, refreshToken, profile, cb) {
      //  TODO : create user from oauth

      console.log(profile);
      const user = profile;
      return cb(undefined, user);
    }
  )
);
