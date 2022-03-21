const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://vykechkin:kechkin123@cluster0.w2ver.mongodb.net/Hospital?retryWrites=true&w=majority";
mongoose.connect(uri);

app.listen(PORT, () => {
  console.log(`Example app lestening on port ${PORT}!`)
});