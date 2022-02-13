const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const client = require("../database");

passport.use(
  "local",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const result = await client.query(
          "SELECT * FROM users WHERE username=$1",
          [username]
        );
        if (!result.rows[0]) {
          return done(
            null,
            false,
            req.flash("message", "Incorrect username or passoword")
          );
        }
        const validPassword = await bcrypt.compare(
          password,
          result.rows[0].password
        );
        if (!validPassword) {
          return done(
            null,
            false,
            req.flash("message", "Incorrect username or passoword")
          );
        }
        return done(null, result.rows[0]);
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  const result = await client.query("SELECT * FROM users WHERE username=$1", [
    username,
  ]);
  done(null, result.rows[0]);
});

module.exports = passport;
