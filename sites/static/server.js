var path = require("path");
var express = require("express");
var serveStatic = require("serve-static");
var fallback = require("express-history-api-fallback");

// Create application
var app = express();

// Set public directory
var publicDir = path.resolve(__dirname);

// Set static application options
app.use("/", serveStatic(publicDir));

// Set fallback application options
app.use(fallback("index.html", { root: publicDir }));

// Serve up application on specified port
app.listen(process.env.PORT);
