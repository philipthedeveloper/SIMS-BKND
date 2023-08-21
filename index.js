require("express-async-errors");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./connections/mongodb_connect");
const customErrorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/not-found");
const methodChecker = require("./middlewares/method-checker");
const cors = require("cors");
const {
  attendanceRouter,
  studentRouter,
  teacherRouter,
  generalRouter,
} = require("./routes");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

// Midddlewares
app.use(methodChecker); // Check if the method on the incoming request is allowed...
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/teacher", teacherRouter);
app.use("/api/v1/general", generalRouter);

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
