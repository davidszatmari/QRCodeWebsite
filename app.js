const express = require("express");
const QRCode = require("qrcode");
const fs = require("fs");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "html");
app.engine("html", (_, options, callback) => {
  fs.readFile(options.file, "utf-8", callback);
});

app.get("/", (req, res) => {
  res.render("index.html", { file: "views/index.html" });
});

app.use(express.json());

// Endpoint to generate QR Code
app.post("/generate", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    // Generate QR code as Data URL
    const qrImageUrl = await QRCode.toDataURL(text, { margin: 1, scale: 10 });
    res.status(200).json({ qrCode: qrImageUrl });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
