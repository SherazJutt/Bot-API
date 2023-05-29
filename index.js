const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./src/router");

app.use("/", routes);

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://sheraz:jutt5000@bot-api.mrqmd6w.mongodb.net/Bot-API?retryWrites=true&w=majority");
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//Connect to the database before listening
connectDB().then(() => {
  app.listen(3000, () => console.log("Server Started (locallhost:3000)"));
});
