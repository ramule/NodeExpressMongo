const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {

    const data = fs.readFileSync(`${__dirname}/usersApi/users.json`, "utf-8");
    const objData = JSON.parse(data);
    if(req.url == "/") {
        res.end("Hello from home");
    } else if(req.url == "/about") {
        res.end("Hello from about");
    } else if(req.url == "/contact") {
        res.end("Hello from contact");
    } else if(req.url == "/users") {
        // console.log(fs.readFileSync(`${__dirname}/usersApi/users.json`));
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify(objData));
    } else {
        res.writeHead(404, {"content-type": "text/html"});
        res.end("<h1>Error :( Page Not Found...!</h1>");
    }
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Listening to the port no 8000");
})