const fs = require("fs");
const createActivitiesFolders = require("./create-activities-folders");

function buildLessonsXml(lessonsJsonFilePath, finalDir) {
  // Read the JSON file and pass its content to createActivitiesFolders
  fs.readFile(lessonsJsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }

    createActivitiesFolders(finalDir, data);
    console.log("Final Moodle backup created successfully at ", finalDir);
  });
}

module.exports = buildLessonsXml;