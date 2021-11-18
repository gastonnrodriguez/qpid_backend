const express = require("express");
const cors = require("cors");

const authRouter = require("./src/routes/authRoutes");


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hola");
});

app.use("/auth", authRouter);

app.listen(PORT, function () {
  console.log(`Corriendo en el puerto ${PORT}`);
});
