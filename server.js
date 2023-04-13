const express = require("express");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
// const fs = require("fs/promises");
// const fs1 = require("fs");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", require("./routes/contactRoutes"));
app.use("/api", require("./routes/contactRoutes"));
app.use(errorHandler);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
console.log(`server running on port ${port}`);
});