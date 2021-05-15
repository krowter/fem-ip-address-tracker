const https = require("http");

const { serveStaticFiles } = require("./routes/root");

const options = {};

https
  .createServer(options, (req, res) => {
    if (req.url.startsWith("/api")) {
      res.writeHead(200);
      res.end("OK");
    }

    serveStaticFiles(req, res);
  })
  .listen(8000);
