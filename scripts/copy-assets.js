const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy Logo.png
const logoSrc = path.join(__dirname, '..', 'Logo.png');
const logoDst = path.join(publicDir, 'logo.png');
if (fs.existsSync(logoSrc)) {
  fs.copyFileSync(logoSrc, logoDst);
  console.log("Copied logo to public/logo.png");
}

// Copy gemini gif
const gifSrc = path.join(__dirname, '..', 'geminif (1).gif');
const gifDst = path.join(publicDir, 'gemini-preview.gif');
const gifDstOrig = path.join(publicDir, 'geminif (1).gif');
if (fs.existsSync(gifSrc)) {
  fs.copyFileSync(gifSrc, gifDst);
  fs.copyFileSync(gifSrc, gifDstOrig);
  console.log("Copied gif to public/gemini-preview.gif");
}
