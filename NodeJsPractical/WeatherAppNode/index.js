const http = require("http");
const fs = require("fs");
var requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
    temperature = temperature.replace("{%tempvalmin%}", orgVal.main.temp_min);
    temperature = temperature.replace("{%tempvalmax%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%city%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    temperature = temperature.replace("{%tempStatus%}", orgVal.weather[0].main);

    return temperature;
}

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests("http://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=0e35cec42b40374d60e64dfca402df75")
      .on("data", (chunk) => {
        const objData = JSON.parse(chunk);
        const arrData = [objData];
        console.log(arrData);
        const realTimeData = arrData.map((val) => replaceVal(homeFile, val)).join("");
        // console.log(realTimeData);
        res.write(realTimeData);
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);
        console.log("end");
        res.end();
      });
  }
});

server.listen(8000, "127.0.0.1");