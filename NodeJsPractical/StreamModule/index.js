const http = require('http');
const fs = require('fs');

const server = http.createServer();

server.on("request", (req, res) => {

    // first way
    // const rStream = fs.createReadStream("input.txt");

    // rStream.on("data", (chunkData) => {
    //     res.write(chunkData);
    // });

    // rStream.on("end", () => {
    //     res.end();
    // });

    // rStream.on("error", () => {
    //     res.end("File not found");
    // });

    //second way

    const rStream = fs.createReadStream("input.txt");
    rStream.pipe(res);
})

server.listen(8000, "127.0.0.1")