const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, "public", req.url === '/' ? 'index.html' : req.url);
  const extname = path.extname(filePath);
  let contentType = "text/html";

  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log(err);
        fs.readFile(path.join(__dirname, 'public', '404.html'),
          (err, cnt) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(cnt, 'utf8');
          })
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`)
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, 'utf8')
    }
  })
});

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
