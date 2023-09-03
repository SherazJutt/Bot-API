const express = require("express");
const app = express();
app.use(express.json());
const routes = require("./src/router");
const { MongoClient } = require('mongodb');
const cors = require("cors");

app.use(cors());
app.use("/", routes);

async function connectToDatabase() {
  const client = new MongoClient("mongodb+srv://sheraz:jutt5000@bot-api.mrqmd6w.mongodb.net/Bot-API?retryWrites=true&w=majority");
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db("Bot-API");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

connectToDatabase().then((database) => {
  app.locals.db = database;
  app.listen(3000, () => console.log("Server Started (locallhost:3000)"));
});
