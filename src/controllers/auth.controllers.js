const client = require("../database.js");
const passport = require("../lib/auth");
const bcrypt = require("bcrypt");

const authControllers = {
  login: (req, res) => {
    res.render('auth/login');
  },
  postLogin: (req, res) => {
    passport.authenticate("local", {
      successRedirect: "/contact",
      failureRedirect: "/login",
      failureFlash: true
    })(req, res);
  },
  logout: (req, res) => {
    req.logOut();
    res.redirect("/");
  },
  signUp: (req, res) => {
    res.render("auth/signup");
  },
  postSignUp: async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await client.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;",
        [username, hashedPassword]
      );
      req.login(
        {
          id: result.rows[0].id,
          username,
        },
        (err) => {
          if (err) next(err);
          res.redirect("/contact");
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },
};

module.exports = authControllers;
