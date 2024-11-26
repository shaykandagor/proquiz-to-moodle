const path = require('path');
const { buildGroupsXml } = require('./json-to-mbz/groups');
const { buildCoursesXml } = require('./json-to-mbz/course/course');

const finalDir = path.join(__dirname, '..', 'final-mbz');
const groupsJsonFilePath = "./exported_data/json/export-file-groups-2024-07-01-11-30-19.json";
const courseJsonFilePath = "./exported_data/json/export-file-sfwd-courses-2024-07-01-11-30-19.json";

function createFinalMoodleBackup(finalDir, groupsJsonFilePath, courseJsonFilePath) {
    buildGroupsXml(groupsJsonFilePath, finalDir);
    buildCoursesXml(courseJsonFilePath, finalDir);
}


createFinalMoodleBackup(finalDir, groupsJsonFilePath, courseJsonFilePath);
