if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

const dbUrl = process.env.ATLASDB_URL;
const sessionSecret = process.env.SECRET || "dev-secret-change-me";
const port = process.env.PORT || 8080;
const sessionDbUrl = process.env.SESSION_DB_URL || "mongodb://127.0.0.1:27017/wanderlust";
const basePort = Number(port);
const maxPortAttempts = 20;

if (!dbUrl) {
  console.warn("ATLASDB_URL is not set. Falling back to local MongoDB.");
}

async function main() {
  const localMongoUrl = "mongodb://127.0.0.1:27017/wanderlust";

  if (!dbUrl) {
    await mongoose.connect(localMongoUrl);
    return localMongoUrl;
  }

  try {
    await mongoose.connect(dbUrl);
    return dbUrl;
  } catch (error) {
    console.warn(`Atlas DB connection failed (${error.message}). Falling back to local MongoDB.`);
    await mongoose.connect(localMongoUrl);
    return localMongoUrl;
  }
}

const store = MongoStore.create({
  mongoUrl: sessionDbUrl,
  crypto: {
    secret: sessionSecret,
  },
  touchAfter: 24 * 2600,
});

store.on("error", (err) => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Some Error Occured!" } = err;
  res.status(statusCode).render("./listings/error.ejs", { message });
});

main()
  .then((mongoConnectionUrl) => {
    console.log(`connected to DB: ${mongoConnectionUrl}`);
    const startServer = (listenPort) => {
      return new Promise((resolve, reject) => {
        const server = app.listen(listenPort, () => {
          console.log(`Listening on port ${listenPort}`);
          console.log(`Open http://localhost:${listenPort}`);
          resolve(listenPort);
        });

        server.on("error", (err) => {
          if (err.code === "EADDRINUSE" && listenPort < basePort + maxPortAttempts) {
            console.warn(`Port ${listenPort} is busy. Trying ${listenPort + 1} instead.`);
            resolve(startServer(listenPort + 1));
            return;
          }

          reject(err);
        });
      });
    };

    startServer(basePort).catch((err) => {
      console.error("Server failed to start:", err.message);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
