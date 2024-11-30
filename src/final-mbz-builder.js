const fs = require("fs");
const path = require("path");
const { buildGroupsXml } = require("./json-to-mbz/groups");
const { buildCoursesXml } = require("./json-to-mbz/course/course");
const { buildQuestionsXml } = require("./json-to-mbz/questions");
const { create } = require("lodash");
const { createSectionsFolders } = require("./json-to-mbz/sections/create-section-folder");

const finalDir = path.join(__dirname, "..", "final-mbz");
const sectionsDir = path.join(finalDir, "sections");

// Ensure the output directory exists
if (!fs.existsSync(finalDir)) {
  fs.mkdirSync(finalDir, { recursive: true });
}

const groupsJsonFilePath = "./exported_data/json/export-file-groups-2024-07-01-11-30-19.json";
const questionsJsonFilePath = "./exported_data/json/export-file-quiz_pro_1-2024-07-01-11-30-19.json";
const coursesJsonFilePath = "./exported_data/json/export-file-sfwd-courses-2024-07-01-11-30-19.json";


function createFinalMoodleBackup() {
  buildGroupsXml(groupsJsonFilePath, finalDir);
  buildQuestionsXml(questionsJsonFilePath, finalDir);
  createSectionsFolders(sectionsDir, coursesJsonFilePath, 3);
}


createFinalMoodleBackup();
