import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";

// App config
const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(Cors());
// DB configs
mongoose.connect("mongodb://localhost:27017/tinderdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// API Endpoints
app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

// create data
app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;
  // Cards is our model
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
//get users
app.get("/tinder/cards", (req, res) => {
  // retrieve every single thing from our db
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
// Listeners
app.listen(PORT, () => {
  console.log(`listening on local host ${PORT}`);
});
