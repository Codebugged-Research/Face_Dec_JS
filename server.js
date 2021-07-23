const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const path = require("path");
var fs = require("fs");
const http = require("http");
const https = require("https");

const httpapp = express();

httpapp.get("*", function (req, res, next) {
  res.redirect("https://" + req.headers.host + req.path);
});

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "/public")));

const httpServer = http.createServer(httpapp);
httpServer.listen(PORT, () => {
  console.log("HTTP Server running on port PORT");
});
const httpsServer = https.createServer(
  {
    key: fs.readFileSync("/etc/letsencrypt/live/codebugged.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/codebugged.com/cert.pem"),
  },
  app
);

httpsServer.listen(PORT, () => {
  console.log("HTTPS Server running on port PORT");
});
