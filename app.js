const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./src/routes/authRoutes");
const {router: proposalsRouter} = require("./src/routes/proposalsRoutes");
const connectDB = require('./src/config/db');
dotenv.config({path:'./src/config/config.env'});

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan('tiny'));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());


connectDB();

app.use("/auth", authRouter);
app.use("/proposals", proposalsRouter);

app.listen(PORT, function () {
  console.log(`Running on port: ${PORT}`);
});
