require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // CORRECTED: Use backticks (`) for template literal
      callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
          });
        }

        done(null, user); // attaches user to req.user
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// called when saving user into session
passport.serializeUser((user, done) => {
  done(null, user.id); // store user._id in session
});

// called on every request to fetch actual user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user); // sets req.user
  } catch (err) {
    done(err, null);
  }
});