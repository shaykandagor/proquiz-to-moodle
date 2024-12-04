const fs = require("fs");
const path = require("path");
const { buildGroupsXml } = require("./json-to-mbz/groups");
const { buildCoursesXml } = require("./json-to-mbz/course/course");
const { buildQuestionsXml } = require("./json-to-mbz/questions");
const { create } = require("lodash");
const createActivitiesFolders = require("./json-to-mbz/activities/create-activities-folders");
const buildLessonsXml = require("./json-to-mbz/activities/lessons");
const processSectionXmlFiles = require("./json-to-mbz/sections/section");
const { createCompletionXml } = require("./json-to-mbz/completion");
const { createScalesXml } = require("./json-to-mbz/scales");
const { createOutcomesXml } = require("./json-to-mbz/outcomes");
const { createMoodleBackup } = require("./json-to-mbz/moodle_backup");
const { createGradebookXml } = require("./json-to-mbz/gradebook");
const { createGradehistoryXml } = require("./json-to-mbz/grade_history");
const { createGroupsXml } = require("./json-to-mbz/groups2");
const createQuestionsXml = require("./json-to-mbz/questions2");
const { createRolesXml } = require("./json-to-mbz/roles");
const { jsonContent } = require("./json-to-mbz/sections/jsonContent");
const { createSectionsFolders } = require("./json-to-mbz/sections/create-section-folders");
const { createFilesXml } = require("./json-to-mbz/files");

const finalDir = path.join(__dirname, "..", "final-mbz");

// Ensure the output directory exists
if (!fs.existsSync(finalDir)) {
  fs.mkdirSync(finalDir, { recursive: true });
}

const groupsJsonFilePath =
  "./exported_data/json/export-file-groups-2024-07-01-11-30-19.json";
const courseJsonFilePath =
  "./exported_data/json/sections.json";
const questionsJsonFilePath =
  "./exported_data/json/export-file-quiz_pro_1-2024-07-01-11-30-19.json";
const lessonsJsonFilePath =
  "./exported_data/json/export-file-sfwd-lessons-2024-07-01-11-30-19.json";
const topicsJsonFilePath =
  "./exported_data/json/export-file-sfwd-topic-2024-07-01-11-30-19.json";

const inputFile = "final-mbz/activities/book_5874/book.xml"
const audioFile = "./exported_data/json/audio/Rakentamisen-muovit_Hiilineutraalius_Paivi-Piispa.mp3"


function createFinalMoodleBackup() {
  //buildCoursesXml(courseJsonFilePath, finalDir);
  //buildQuestionsXml(questionsJsonFilePath, finalDir);
  //buildGroupsXml(groupsJsonFilePath, finalDir);
  buildLessonsXml(lessonsJsonFilePath, topicsJsonFilePath, finalDir);
  createCompletionXml(finalDir)
  createGradebookXml(finalDir)
  createScalesXml(finalDir)
  createOutcomesXml(finalDir)
  createMoodleBackup(finalDir)
  createGradebookXml(finalDir)
  createGradehistoryXml(finalDir)
  createGroupsXml(finalDir)
  createQuestionsXml(finalDir)
  createRolesXml(finalDir)
  createFilesXml(finalDir, inputFile, audioFile)

  // jsonContent()

  const sectionsDir = path.join(finalDir, "sections");
  const startId = 5630;
  const numberOfSections = 4;
  createSectionsFolders(sectionsDir, startId, numberOfSections);
  processSectionXmlFiles(courseJsonFilePath, sectionsDir);
  }

createFinalMoodleBackup();
