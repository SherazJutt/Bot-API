// Import packages
const express = require("express");
const routes = require("./src/router");
const mongoose = require("mongoose");

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use("/", routes);

// connection
const port = process.env.PORT || 9001;
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb+srv://sheraz:jutt5000@bot-api.mrqmd6w.mongodb.net/Bot-API?retryWrites=true&w=majority")
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(port, () => console.log(`Server Started ${port}`));
  })
  .catch((error) => {
    console.log(error);
  });
