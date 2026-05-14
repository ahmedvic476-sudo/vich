const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8000;
const ROOT = __dirname;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml"
};

const server = http.createServer((req, res) => {
  let requestPath = decodeURIComponent(req.url.split("?")[0]);

  if (requestPath === "/" || requestPath === "") {
    requestPath = "/index.html";
  }

  const filePath = path.join(ROOT, requestPath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("File not found: " + requestPath);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream"
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log("PlayStation Cafe Manager - PWA Server");
  console.log("Server running at: http://localhost:" + PORT);
  console.log("Open in Chrome: http://localhost:" + PORT + "/index.html");
});