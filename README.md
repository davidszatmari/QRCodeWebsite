# Node.js QR Code Generator & Decoder Web App

A simple and modern web application built with Node.js that allows users to **generate** and **decode** QR codes from images or text. Perfect for quick testing, or for personal use.

## Screenshots

![Screenshot](./screenshot1.png)
![Screenshot](./screenshot2.png)

## Features

- ✅ Generate QR codes from any text or URL
- ✅ Decode QR codes from uploaded images
- ✅ Customize QR code output:
  - Adjust image **scale/size** (1-100)
  - Select **error correction level** (L, M, Q, H)
  - Select **QR code version** (1–40)
- ✅ Fast and clean user interface
- ✅ Built with Express.js

## Built With

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript
- **QR Code Generation**: `qrcode` npm package
- **QR Code Decoding**: `jsqr` npm package

## Setup

### Prerequisites

- Node.js (v14 or later)
- npm

### Installation

```bash
git clone https://github.com/davidszatmari/QRCodeWebsite.git
cd QRCodeWebsite
npm install
```

### Running the App

```bash
npm start
```
