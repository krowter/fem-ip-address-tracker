const fs = require("fs");

const staticFolder = "/../static";

const staticFileMime = {
  ico: "image/x-icon",
  html: "text/html",
  css: "text/css",
  js: "text/javascript",
  svg: "image/svg+xml",
  png: "image/png",
};

exports.serveStaticFiles = (req, res) => {
  const fileExt = req.url.split(".").pop();

  if (!Object.keys(staticFileMime).includes(fileExt)) {
    res.writeHead(404);
    return;
  }

  fs.readFile(__dirname + staticFolder + req.url, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }

    res.writeHead(200, {
      "Content-Type": staticFileMime[fileExt],
    });
    res.end(data);
  });
};
