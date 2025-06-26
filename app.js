const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "html");
app.engine("html", (_, options, callback) => {
  fs.readFile(options.file, "utf-8", callback);
});

app.get("/", (req, res) => {
  res.render("index.html", { file: "views/index.html" });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
