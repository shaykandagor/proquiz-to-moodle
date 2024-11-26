const fs = require("fs");
const path = require("path");

const baseDir = "./final-mbz/sections";

if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

function createSectionFolder(id) {
  const folderName = `section_${id}`;
  const folderPath = path.join(baseDir, folderName);

  // Check if the folder already exists
  if (!fs.existsSync(folderPath)) {
    // Create the folder
    fs.mkdirSync(folderPath);
    console.log(`Created folder: ${folderPath}`);
  } else {
    console.log(`Folder already exists: ${folderPath}`);
  }
}

module.exports = createSectionFolder;
