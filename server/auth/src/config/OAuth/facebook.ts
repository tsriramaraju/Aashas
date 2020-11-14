import { use } from 'passport';
import { Strategy as facebookStrategy } from 'passport-facebook';
import config from '..';
import { Account } from '../../models';
import {
  AccountDoc,
  authType,
  natsWrapper,
  ResourceNotFoundError,
  verification,
} from '@aashas/common';
import { AccountCreatedPublisher } from '../../events';

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
      profileFields: ['id', 'email', 'gender', 'name', 'picture.type(large)'],
    },
    async (accessToken, refreshToken, profile, cb) => {
      let user: AccountDoc | null;

      user = await Account.findOne({ facebookID: profile.id });

      if (!user) {
        user = await Account.facebookBuild({
          authType: authType.facebook,
          email: profile._json.email,
          emailVerified: verification.yes,
          facebookID: profile._json.id,
          lastLogin: Date.now().toString(),
          name: profile._json.first_name,
        }).save();

        //Publishes Account created event once the user is registered
        new AccountCreatedPublisher(natsWrapper.client).publish({
          id: user.id,
          data: {
            authMode: authType.email,
            id: user.id,
            name: user.name,
            email: user.email,
            profilePic: profile.photos![0].value,
          },
        });
      }

      return cb(undefined, user);
    }
  )
);
