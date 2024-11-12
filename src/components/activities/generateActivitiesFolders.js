const fs = require("fs");
const path = require("path");

function generateActivitiesFolders(outputDir) {
  const activities = [
    'assign', 
    'attendance', 
    'board', 
    'chat', 
    'feedback', 
    'folder',
    'label', 
    'page',
    'quiz',
    'resource',
    'url',];
  
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