const passport = require("passport");
const User = require("../models/user");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

// Configures Google oauth strategy for passport authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.Callback_URL,
    },

    // Verify callback executed after Google auth succeeds
    async function (_accessToken, _refreshToken, profile, done) {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(new Error("No email returned from Google.").null);
        }

        // Check if user already exists with Google oauth creds
        let user = await User.findOne({
          oauthProvider: "google",
          oauthId: profile.id,
        });

        // Check if local account with same email exists then link it
        if (!user) {
          user = await User.findOne({ email });

          // Link existing local account to Google OAuth
          if (user) {
            user.oauthProvider = "google";
            user.oauthId = profile.id;
            user.isVerified = true;
            user.avatar = user.avatar || profile.photos?.[0]?.value;

            // Create new user from Google profile
          } else {
            user = new User({
              name: profile.displayName,
              email,
              oauthProvider: "google",
              oauthId: profile.id,
              avatar: profile.photos?.[0]?.value,
              isVerified: true,
            });
          }

          // Save new or updated record
          await user.save();
        }

        user.lastLogin = new Date();
        await user.save();

        return done(null, user);
      } catch (e) {
        return (e, null);
      }
    }
  )
);

// Since authentication is stateless (using JWT in cookie),
//  these functions are required by Passport but do not
//  do the session persistence.
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;
