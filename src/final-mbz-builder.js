const path = require('path');
const { buildGroupsXml } = require('./json-to-mbz/groups');

// Define output directory
const finalDir = path.join(__dirname, 'final-mbz');

// Correct the output path for groups.xml
const jsonFilePath = "./exported_data/json/export-file-groups-2024-07-01-11-30-19.json";

buildGroupsXml(jsonFilePath, finalDir);

createMoodleBackup(finalDir);