const fs = require("fs");
const path = require("path");
const generateCoursefiles = require("./create-course-files");

function createCourseFolder(outputDir) {
  const courseDir = path.join(outputDir, "course");

  // Ensure the course folder exists
  if (!fs.existsSync(courseDir)) {
    fs.mkdirSync(courseDir, { recursive: true });
    console.log(`Created course folder: ${courseDir}`);
  } else {
    console.log(`Course folder already exists: ${courseDir}`);
  }

  // create xml files inside the course folder
  generateCoursefiles(courseDir);
}

module.exports = createCourseFolder;
