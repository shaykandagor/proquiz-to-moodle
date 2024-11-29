const fs = require("fs");
const path = require("path");
const { buildGroupsXml } = require("./json-to-mbz/groups");
const { buildCoursesXml } = require("./json-to-mbz/course/course");
const { buildQuestionsXml } = require("./json-to-mbz/questions");
const createSectionFolder = require("./json-to-mbz/sections/create-section-folder");
const { buildSectionXml, buildFirstSectionXml } = require("./json-to-mbz/sections/section_5630");
const { create } = require("lodash");
const { buildSecondSectionXml } = require("./json-to-mbz/sections/section_5631");
const { buildThirdSection } = require("./json-to-mbz/sections/section_5632");

const finalDir = path.join(__dirname, "..", "final-mbz");
const sectionsDir = path.join(finalDir, "sections");

// Ensure the output directory exists
if (!fs.existsSync(finalDir)) {
  fs.mkdirSync(finalDir, { recursive: true });
}

const groupsJsonFilePath = "./exported_data/json/export-file-groups-2024-07-01-11-30-19.json";
const questionsJsonFilePath = "./exported_data/json/export-file-quiz_pro_1-2024-07-01-11-30-19.json";
const sectionJsonFilePath = "./exported_data/json/export-file-sfwd-courses-2024-07-01-11-30-19.json";


/* // Extract the initial post ID from the first element in the wp_data array
const initialPostId = sectionsData.wp_data[0].wp_post_id;

if (typeof initialPostId !== "number") {
  console.error("Invalid wp_post_id in JSON file:", initialPostId);
  process.exit(1);
}

// Loop to create section folders for the initial post ID and the next two IDs
for (let i = 0; i < 3; i++) {
  const sectionId = initialPostId + i;
  createSectionFolder(sectionId);
} */

// console.log("Section folders created for IDs:", initialPostId, initialPostId + 1, initialPostId + 2);

function createFinalMoodleBackup() {
  buildGroupsXml(groupsJsonFilePath, finalDir);
  //buildCoursesXml(courseJsonFilePath, finalDir);
  buildQuestionsXml(questionsJsonFilePath, finalDir);
  buildFirstSectionXml(sectionJsonFilePath, sectionsDir);
  // buildSecondSectionXml(sectionJsonFilePath, initialPostId + 1);
  // buildThirdSection(sectionJsonFilePath, initialPostId + 2);
}


createFinalMoodleBackup();
