import { keys } from '../keys';
import { use } from 'passport';
import { Account } from '../../models';
import { Strategy as googleStrategy } from 'passport-google-oauth20';
import { AccountCreatedPublisher } from '../../events';
import {
  AccountDoc,
  authType,
  natsWrapper,
  ResourceNotFoundError,
  verification,
} from '@aashas/common';

if (!keys.googleClientID || !keys.googleClientSecret) {
  throw new ResourceNotFoundError(
    'Oauth is currently down, plz try again later'
  );
}
use(
  new googleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: 'http://aashas.com/api/v1/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      let user: AccountDoc | null;
      /**
       * check for existing user
       */
      user = await Account.findOne({ googleID: profile.id });

      if (!user) {
        /**
         * create account if no user exists with same email id
         */
        user = await Account.findOne({ email: profile._json.email });
        /**
         * create an account if not record exists in database
         */

        if (!user) {
          user = await Account.googleBuild({
            authType: authType.google,
            email: profile._json.email,
            emailVerified: verification.yes,
            googleID: profile.id,
            lastLogin: Date.now().toString(),
            name: profile.displayName,
          }).save();

          /**
           * Publish account created event for users service
           */
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
      }
      user.lastLogin = Date.now().toString();
      await user.save();

      return cb(undefined, user);
    }
  )
);
