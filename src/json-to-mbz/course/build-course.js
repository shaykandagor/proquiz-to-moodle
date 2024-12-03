const fs = require("fs");
const path = require("path");
const { processCourseXmlFile } = require("./course");
const createCourseFolder = require("./create-course-folder");
const generateCoursefiles = require("./create-course-files");

function buildCourseXml(courseJsonFilePath, finalDir) {
    console.log("courseJsonFilePath", courseJsonFilePath);
  fs.readFile(courseJsonFilePath, "utf8", (err, courseData) => {
    if (err) {
      console.error("Error reading course JSON file:", err);
      return;
    }

    const courseDir = path.join(finalDir, "course");
    const courseXmlPath = path.join(courseDir, "course.xml");

    // Check if the course folder exists
    if (fs.existsSync(finalDir)) {
      // Check if the necessary files are missing
      if (!fs.existsSync(courseXmlPath)) {
        generateCoursefiles(courseDir);
      }
      // Process the XML files
      processCourseXmlFile(courseJsonFilePath, courseDir);
      console.log("Course XML processed and created in", finalDir);
    } else {
      // Create the course folder
      createCourseFolder(finalDir, (err) => {
        if (err) {
          console.error("Error creating course folder:", err);
          return;
        }

        // Process the XML files
        processCourseXmlFile(courseJsonFilePath, courseDir);
        console.log("Course XML processed and created in", finalDir);
      });
    }
  });
}

module.exports = buildCourseXml;

