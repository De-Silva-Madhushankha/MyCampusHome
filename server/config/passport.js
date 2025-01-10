import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Ensure that the necessary environment variables are set
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error('Error: GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set in the .env file.');
  process.exit(1); // Exit the application if variables are missing
}

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Configure Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Correctly reference environment variable
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Correctly reference environment variable
      callbackURL: 'http://localhost:4000/auth/google/callback', // Update if needed
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in your database
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          // User exists, proceed to serialize
          return done(null, user);
        } else {
          // If user doesn't exist, create a new user
          user = new User({
            googleId: profile.id,
            firstName: profile.name.givenName || 'FirstName', // Fallbacks added
            lastName: profile.name.familyName || 'LastName',
            email: profile.emails[0].value, // Ensure that emails are enabled in your Google OAuth settings
            password: '', // Password can be empty or set to a random string since OAuth is used
          });

          await user.save();
          return done(null, user);
        }
      } catch (error) {
        console.error('Error in Google Strategy:', error);
        return done(error, null);
      }
    }
  )
);