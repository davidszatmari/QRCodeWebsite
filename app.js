const express = require("express");
const QRCode = require("qrcode");
const fs = require("fs");
const app = express();
const multer = require("multer");
const jsQR = require("jsqr");
const sharp = require("sharp");

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

app.get("/decode", (req, res) => {
  res.render("decode.html", { file: "views/decode.html" });
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

app.post("/decodeqr", upload.single("qrImage"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Image file is required" });
  }

  try {
    const imageBuffer = fs.readFileSync(req.file.path);

    // Convert image to raw pixel data
    const { data, info } = await sharp(imageBuffer)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const qrCode = jsQR(data, info.width, info.height);

    if (!qrCode) {
      return res.status(400).json({ error: "Unable to decode QR code" });
    }

    res.json({ decodedText: qrCode.data });
  } catch (err) {
    console.error("Error decoding QR:", err);
    res.status(500).json({ error: "Failed to process image" });
  } finally {
    fs.unlink(req.file.path, () => {}); // optional cleanup
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
