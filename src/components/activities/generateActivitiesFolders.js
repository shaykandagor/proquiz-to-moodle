const fs = require("fs");
const path = require("path");

function generateActivitiesFolders(outputDir) {
  const activities = [ 
    'book',
    'page',
    'quiz',];
  
    // Ensure the output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Create subdirectories
  activities.forEach((dir) => {
    const dirPath = path.join(outputDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
}

module.exports = generateActivitiesFolders;