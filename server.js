const https = require("http");

const { serveStaticFiles } = require("./routes/root");
const { handleApiRequest } = require("./routes/api");

const options = {};

https
  .createServer(options, (req, res) => {
    if (req.url.startsWith("/api")) {
      handleApiRequest(req, res);
    }

    serveStaticFiles(req, res);
  })
  .listen(8000);
