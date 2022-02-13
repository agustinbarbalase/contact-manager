const express = require("express");
const path = require("path");
const flash = require("connect-flash");

// Handlebars export
const hbs = require("express-handlebars");

// Database session
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const { Pool } = require("pg");

const { isNotAuthenticated } = require("./middlewares/authentication");

const app = express();
require("dotenv").config();
require("./database");

const PORT = 3000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handlebars
app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  hbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

// Passport session
app.use(
  session({
    secret: process.env.SECRET_COOKIE,
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
      pool: new Pool({
        connectionString: process.env.DATABASE_URI,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      tableName: "sessions",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Messages 
app.use(flash());

app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});

// Routes
app.use(require("./routes/contact.routes"));
app.use(require("./routes/auth.routes"));
app.get("/", isNotAuthenticated, (req, res) => {
  res.render("home");
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
