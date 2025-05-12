const fs = require("fs");
const path = require("path");
const buildLessonsXml = require("./json-to-mbz/activities/lessons");;
const buildCourseXml = require("./json-to-mbz/course/build-course");
const buildSections = require("./json-to-mbz/sections/build-sections");
const { processQuizXml } = require("./json-to-mbz/activities/quiz");
const generateMainFiles = require("./json-to-mbz/main-files/create-main-files");
const buildFilesXml = require("./json-to-mbz/files/build-file");

const finalDir = path.join(__dirname, "..", "final-mbz");

// Ensure the output directory exists
if (!fs.existsSync(finalDir)) {
  fs.mkdirSync(finalDir, { recursive: true });
  console.log(`Directory created: ${finalDir}`);
} else {
  console.log(`Directory already exists: ${finalDir}`);
}

const courseJsonFilePath = "./exported_data/json/export-file-sfwd-courses-2024-07-01-11-30-19.json";
const lessonsJsonFilePath = "./exported_data/json/export-file-sfwd-lessons-2024-07-01-11-30-19.json";
const topicsJsonFilePath = "./exported_data/json/export-file-sfwd-topic-2024-07-01-11-30-19.json";

async function createFinalMoodleBackup() {
  // Step 1: Create course folder
  await buildCourseXml(courseJsonFilePath, finalDir); // creates course folder
  // Step 2: Create activities folder
  await buildLessonsXml(lessonsJsonFilePath, topicsJsonFilePath, finalDir); // creates activities folder

  // Step 3: Create sections folder
  await buildSections(finalDir)
  // Step 4: Create main files
  await generateMainFiles (finalDir);
  
  await buildFilesXml(finalDir) // creates files.xml

  processQuizXml(lessonsJsonFilePath, finalDir);
}

createFinalMoodleBackup();
