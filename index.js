// Import packages
const express = require("express");
const routes = require("./src/router");

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use("/", routes);

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Server Started ${port}`));
