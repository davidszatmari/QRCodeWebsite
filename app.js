const express = require("express");
const QRCode = require("qrcode");
const fs = require("fs");
const app = express();
const multer = require("multer");
const jsQR = require("jsqr");
const sharp = require("sharp");
const { error } = require("console");

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

//Generate QR Code
app.post("/generate", async (req, res) => {
  const { text } = req.body;
  const { input_scale } = req.body;
  const { input_errorCorrection } = req.body;
  const { input_version } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    // Generate QR code as Data URL
    const qrImageUrl = await QRCode.toDataURL(text, {
      margin: 1,
      scale: input_scale, // default 4
      errorCorrectionLevel: input_errorCorrection, // default M
      version: input_version, // default null
      //color: {
      //  dark: "#010599FF",
      //  light: "#FFBF60FF",
      //},
    });
    console.log(text, input_scale, input_errorCorrection, input_version);
    res.status(200).json({ qrCode: qrImageUrl });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

// Decode QR Code
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
