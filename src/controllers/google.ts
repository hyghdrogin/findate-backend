import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import config from "../config";
import { UserInterface } from "../utilities/interface";
import models from "../models";
import jwtHelper from "../utilities/jwt";

const { generateToken } = jwtHelper;

passport.use(
  new Strategy(
    {
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL: config.CALLBACK_URL
    },
    async (accessToken: string, refreshToken:string, profile, done) => {
      const user: UserInterface | null = await models.User.findOne({ email: profile.emails?.[0].value, });
      if (user) {
        const { _id, email } = user;
        const token = await generateToken({ _id, email });
        const userDetails = {
          _id,
          email,
          name: user.name,
          surname: user.surname,
          phone: user.phone,
          role: user.role,
          photo: user.photo,
          verified: user.verified,
          password: user.password
        };
        return done(null, userDetails, token);
      }
      if (!user) {
        const newUser: UserInterface = await models.User.create({
          googleId: profile.id,
          name: profile.name?.givenName,
          surname: profile.name?.familyName,
          email: profile.emails?.[0].value,
          photo: profile.photos?.[0].value,
          password: " ",
          verified: true
        });
        if (newUser) {
          done(null, newUser);
        }
      } else {
        done(null, user);
      }
    }
  )
);
