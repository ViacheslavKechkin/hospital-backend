require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT;

const userRoutes = require("./src/modules/routes/userRouter");
const recordRoutes = require("./src/modules/routes/recordRouter");

app.use(cors());
app.use(express.json());
app.use("/", userRoutes);
app.use("/", recordRoutes);

const uri = process.env.URI;
mongoose.connect(uri);

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Example app lestening on port ${PORT}!`)
    });
  } catch (e) {
    console.log(e);
  }
}

start()