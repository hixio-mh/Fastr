var express = require("express");
var fallback = require("express-history-api-fallback");
var path = require("path");

// Store data
var recievedDataDictionary = [];

// Create application
var app = express();

// Set public directory
var publicDir = path.resolve(__dirname, "../../www/");

// Set static application options
app.use("/", express.static(publicDir, { maxAge: "0d" }));
app.use(express.json());

app.post("/api/data-dictionary", (req, res) => {
    console.log("got a request?", req.body);

    recievedDataDictionary.push(req.body);
    res.status(201).send(`${recievedDataDictionary.length - 1}`);
});

app.get("/api/data-dictionary/:key", (req, res) => {
    console.log("get something", req.params.key);
    try {
        res.send(recievedDataDictionary[req.params.key]);
    } catch (e) {
        res.send(e);
    }
});

// Set fallback application options
app.use(fallback("index.html", { root: publicDir }));

// Serve up application on specified port
var port = process.env.PORT || 7001;
app.listen(port);
