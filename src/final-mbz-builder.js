const fs = require('fs');
const path = require('path');
const { buildGroupsXml } = require('./json-to-mbz/groups');
const { buildCoursesXml } = require('./json-to-mbz/course/course');

const finalDir = path.join('final-mbz');
const outputDir = path.join(__dirname, '..', 'output', finalDir);

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const groupsJsonFilePath = "./exported_data/json/export-file-groups-2024-07-01-11-30-19.json";
const courseJsonFilePath = "./exported_data/json/export-file-sfwd-courses-2024-07-01-11-30-19.json";

function createFinalMoodleBackup(outputDir, groupsJsonFilePath, courseJsonFilePath) {
    buildGroupsXml(groupsJsonFilePath, outputDir);
    // buildCoursesXml(courseJsonFilePath, outputDir);
}

createFinalMoodleBackup(outputDir, groupsJsonFilePath, courseJsonFilePath);