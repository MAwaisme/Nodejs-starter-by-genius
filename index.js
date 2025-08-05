const http = require('http');
const fs = require("fs");

const myServer = http.createServer((req, res) => {
    const log = `${Date?.now()}: ${req.url} New request\n`

    fs.appendFile("log.txt", log, (err, data) => {
        switch (req?.url) {
            case "/":
                res?.end("Homepage");
                break;
            case "/about":
                res?.end("In About page")
                break;
            default:
                res?.end("404");
        }
    })
    // console.log("New req from server!");
    // res.end("Hey from server!")
});

myServer?.listen(8000, () => console.log("Server started!"))