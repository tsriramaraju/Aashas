import { use } from 'passport';
import { Strategy as googleStrategy } from 'passport-google-oauth20';
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
    async (accessToken, refreshToken, profile, cb) => {
      let user: AccountDoc | null;

      user = await Account.findOne({ googleID: profile.id });

      if (!user) {
        user = await Account.googleBuild({
          authType: authType.google,
          email: profile._json.email,
          emailVerified: verification.yes,
          googleID: profile.id,
          lastLogin: Date.now().toString(),
          name: profile.displayName,
        }).save();

        //Publishes Account created event once the user is registered
        new AccountCreatedPublisher(natsWrapper.client).publish({
          id: user.id,
          data: {
            authMode: authType.google,
            id: user.id,
            name: user.name,
            email: user.email,
            profilePic: profile._json.picture,
          },
        });
      }

      return cb(undefined, user);
    }
  )
);
