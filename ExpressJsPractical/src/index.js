const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const port = 8000;

console.log(path.join(__dirname, "../public"));
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");

// we can rename the "views" folder name to anything and will have to set as below
app.set("views", templatePath);
hbs.registerPartials(partialsPath);
// app.use(express.static(staticPath));

app.get("", (req, res) => {
    res.render("index", {
        channel: "Subscribe"
    });
})

// app.get("/", (req, res) => {
//     res.send("Hello from home page");
// });

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/about/*", (req, res) => {
    res.render("pageNotFound", {
        errorComment: "Oops, this about page not found...!"
    });
});

app.get("*", (req, res) => {
    res.render("pageNotFound", {
        errorComment: "Oops, page not found...!"
    });
});

app.listen(port, () => {
    console.log("Listening to the port 8000");
});