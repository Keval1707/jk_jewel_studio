const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");


const mainRouter = require('./routes/router');
const connectDB = require("./config/db");

const app = express();

app.use(cookieParser());


// Whitelist CORS for specific origins
const allowedOrigins = ["http://localhost:5173", "http://145.223.18.5:9194"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));


app.use(express.json());
connectDB();

app.use("/upload", express.static("upload"));
app.use('/', mainRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
