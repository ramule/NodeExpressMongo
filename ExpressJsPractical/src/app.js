const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("Hello from home page");
});

app.get("/about", (req, res) => {
    res.status(200).send("Hello from about pages");
});

app.listen(8000, () => {
    console.log("Listening to the port 8000");
});