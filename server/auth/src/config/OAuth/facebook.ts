import { keys } from '../keys';
import { use } from 'passport';
import { Account } from '../../models';
import { AccountCreatedPublisher } from '../../events';
import { Strategy as facebookStrategy } from 'passport-facebook';
import {
  AccountDoc,
  authType,
  natsWrapper,
  ResourceNotFoundError,
  verification,
} from '@aashas/common';

/**
 * check for environmental variables before initializing oauth
 */
if (!keys.facebookClientID || !keys.facebookClientSecret) {
  throw new ResourceNotFoundError(
    'Facebook Signin is currently down, plz try again later'
  );
}
/**
 * Facebook strategy
 */
use(
  new facebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: 'https://aashas.com/api/v1/auth/facebook/callback',
      profileFields: ['id', 'email', 'gender', 'name', 'picture.type(large)'],
    },
    async (accessToken, refreshToken, profile, cb) => {
      let user: AccountDoc | null;

      /**
       * check for existing user
       */
      user = await Account.findOne({ facebookID: profile.id });

      if (!user) {
        /**
         * create account if no user exists with same email id
         */
        user = await Account.findOne({ email: profile._json.email });
        /**
         * create an account if not record exists in database
         */
        if (!user) {
          user = await Account.facebookBuild({
            authType: authType.facebook,
            email: profile._json.email,
            emailVerified: verification.yes,
            facebookID: profile._json.id,
            lastLogin: Date.now().toString(),
            name: profile._json.first_name,
          }).save();

          /**
           * Publish account created event for users service
           */
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
      }

      user.lastLogin = Date.now().toString();
      await user.save();

      return cb(undefined, user);
    }
  )
);
