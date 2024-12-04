const fs = require("fs");
const path = require("path");
const buildLessonsXml = require("./json-to-mbz/activities/lessons");
const createSectionsFolders = require("./json-to-mbz/sections/create-section-folders");
const processSectionXmlFiles = require("./json-to-mbz/sections/section");
const buildCourseXml = require("./json-to-mbz/course/build-course");
const generateMainFiles = require("./json-to-mbz/main-files/create-main-files");
const jsonContent = require("./json-to-mbz/sections/jsonContent");

// const finalDir = path.join(__dirname, "..", "final-mbz");
const finalDir = path.join(__dirname, "..", "test-final-mbz");

// Ensure the output directory exists
if (!fs.existsSync(finalDir)) {
  fs.mkdirSync(finalDir, { recursive: true });
  console.log(`Directory created: ${finalDir}`);
} else {
  console.log(`Directory already exists: ${finalDir}`);
}

//const groupsJsonFilePath = "./exported_data/json/export-file-groups-2024-07-01-11-30-19.json";
//const questionsJsonFilePath = "./exported_data/json/export-file-quiz_pro_1-2024-07-01-11-30-19.json";

const sectionsJsonFilePath = "./exported_data/json/sections.json";
const courseJsonFilePath = "./exported_data/json/export-file-sfwd-courses-2024-07-01-11-30-19.json";
const lessonsJsonFilePath = "./exported_data/json/export-file-sfwd-lessons-2024-07-01-11-30-19.json";
const topicsJsonFilePath = "./exported_data/json/export-file-sfwd-topic-2024-07-01-11-30-19.json";

async function createFinalMoodleBackup() {

  // Step 1: Create course folder
  //await buildCourseXml(courseJsonFilePath, finalDir); // creates course folder
  // Step 2: Create activities folder
  //await buildLessonsXml(lessonsJsonFilePath, topicsJsonFilePath, finalDir); // creates activities folder
  // Step 3: Create sections folder

  /* const sectionsDir = path.join(finalDir, "sections");
  const startId = 5630;
  const numberOfSections = 4; */
  createSectionsFolders(finalDir); // creates sections folder
  // jsonContent();
  // processSectionXmlFiles(sectionsJsonFilePath, sectionsDir);

  // Step 4: Create main files
  //generateMainFiles(finalDir);
}

createFinalMoodleBackup();
