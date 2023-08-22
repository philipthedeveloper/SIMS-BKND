require("express-async-errors");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./connections/mongodb_connect");
const customErrorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/not-found");
const methodChecker = require("./middlewares/method-checker");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
  attendanceRouter,
  studentRouter,
  teacherRouter,
  generalRouter,
  userRouter,
  parentRouter,
  chatRouter,
} = require("./routes");
const validateToken = require("./middlewares/validateToken");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

// Create a store session
const store = new MongoDBStore(
  { uri: process.env.MONGODB_URI, collection: "userSessions" },
  (err) => err && console.log("error occured: ", err)
);

// Listen for store error;
store.on("error", function (err) {
  console.log("Error creating store: ", err);
});

app.set("trust proxy", 1); // Allow proxy to set cookie in non-http request

// Create session
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    },
    store: store,
  })
);

// Midddlewares
app.use(methodChecker); // Check if the method on the incoming request is allowed...
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// app.use(cookieParser(process.env.SESSION_SECRET));
app.use(cookieParser());

const CORS_ORIGIN = process.env.CORS_ORIGIN;

console.log(CORS_ORIGIN);

app.use(
  cors({ credentials: true, origin: ["http://localhost:5173", CORS_ORIGIN] })
);
app.use("/api/v1/attendance", validateToken, attendanceRouter);
app.use("/api/v1/student", validateToken, studentRouter);
app.use("/api/v1/teacher", validateToken, teacherRouter);
app.use("/api/v1/general", validateToken, generalRouter);
app.use("/api/v1/parent", validateToken, parentRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", validateToken, chatRouter);

app.all("*", notFound);
app.use(customErrorHandler);

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log("Server listening on PORT:" + PORT));
  } catch (error) {
    console.log(error);
  }
})();
