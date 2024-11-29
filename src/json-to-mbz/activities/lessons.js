const fs = require("fs");
const path = require("path");
const createActivitiesFolders = require("./create-activities-folders");
const { processPageXmlFiles } = require("./page");
const { processBookXmlFiles } = require("./book");

function buildLessonsXml(lessonsJsonFilePath, finalDir) {
  // Read the JSON file to get the ids and pass its content to createActivitiesFolders
  fs.readFile(lessonsJsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }

    createActivitiesFolders(finalDir, data);
    console.log("Activities folders created successfully at ", finalDir);

    // Process XML files
    //processPageXmlFiles(lessonsJsonFilePath, path.join(finalDir, "activities"));
    processBookXmlFiles(lessonsJsonFilePath, path.join(finalDir, "activities"));
    console.log("XMLs created ", finalDir);
  });
}

module.exports = buildLessonsXml;