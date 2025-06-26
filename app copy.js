const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "html");
app.engine("html", (_, options, callback) => {
  fs.readFile(options.file, "utf-8", callback);
});

app.get("/", (req, res) => {
  res.render("index.html", { file: "views/index.html" });
});

app.post("/generate", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    // Generate QR code as Data URL
    const qrImageUrl = await QRCode.toDataURL(text);
    res.status(200).json({ qrCode: qrImageUrl });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

app.listen(3000, () => console.log("Server on http://localhost:3000"));
