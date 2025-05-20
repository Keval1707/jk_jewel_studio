const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mainRouter = require('./routes/router');
const connectDB = require("./config/db");


const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/upload", express.static("upload"));
app.use('/', mainRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
