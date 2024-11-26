const fs = require("fs");
const path = require("path");
const { buildGroupsXml } = require("./json-to-mbz/groups");
const { buildCoursesXml } = require("./json-to-mbz/course/course");
const { buildQuestionsXml } = require("./json-to-mbz/questions");

const finalDir = path.join(__dirname, "..", "final-mbz");

const outputDir = `./output/${finalDir}`;

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const groupsJsonFilePath =
  "./exported_data/json/export-file-groups-2024-07-01-11-30-19.json";
const courseJsonFilePath =
  "./exported_data/json/export-file-sfwd-courses-2024-07-01-11-30-19.json";
const questionsJsonFilePath =
  "./exported_data/json/export-file-quiz_pro_1-2024-07-01-11-30-19.json";

function createFinalMoodleBackup() {
  buildGroupsXml(groupsJsonFilePath, finalDir);
  buildCoursesXml(courseJsonFilePath, finalDir);
  buildQuestionsXml(questionsJsonFilePath, finalDir);
}

createFinalMoodleBackup();
