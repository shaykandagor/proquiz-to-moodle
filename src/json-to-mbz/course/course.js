const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

const generateContextid = () => parseInt(Math.random() * 10000000);
const oneYearInSeconds = 365 * 24 * 60 * 60;
const timestamp = Math.floor(Date.now() / 1000);
const oneYearFromNow = timestamp + oneYearInSeconds;

// Function to create course content from JSON data
const createCourseContent = (data) =>
    JSON.parse(data).wp_data.map(
        ({
            wp_post_id,
        }) => ({
            id: wp_post_id,
            contextid: generateContextid(),
            startdate: timestamp,
            enddate: oneYearFromNow,
            timecreated: timestamp,
            timemodified: timestamp,
        })
    );



// Function to update XML with JSON content
const updateCourseXmlWithJsonContent = (xmlData, jsonContent) => {
  const parser = new xml2js.Parser();
  const builder = new xml2js.Builder({
    xmldec: { standalone: null, encoding: "UTF-8" },
  });

  return new Promise((resolve, reject) => {
    parser.parseString(xmlData, (err, result) => {
      if (err) {
        return reject(err);
      }
      // Update course.xml
      result.course.$.id = jsonContent.id;
      result.course.$.contextid = jsonContent.contextid;
      result.course.shortname = "Pro quiz";
      result.course.fullname = "Pro quiz course";
      result.course.startdate = jsonContent.startdate;
      result.course.enddate = jsonContent.enddate;
      result.course.timecreated = jsonContent.timecreated;
      result.course.timemodified = jsonContent.timemodified;

      const updatedXml = builder.buildObject(result);
      resolve(updatedXml);
    });
  });
};

const enrol_id1 = () => parseInt(Math.random() * 100000);
const enrol_id2 = () => parseInt(Math.random() * 100000);

// function to update enrolments.xml 
const updateEnrolmentsXml = (xmlData, jsonContent) => {
  const parser = new xml2js.Parser();
  const builder = new xml2js.Builder({
    xmldec: { standalone: null, encoding: "UTF-8" },
  });

  return new Promise((resolve, reject) => {
    parser.parseString(xmlData, (err, result) => {
      if (err) {
        return reject(err);
      }
      // Update enrolments.xml
      if (
        result.enrolments &&
        result.enrolments.enrols &&
        result.enrolments.enrols[0] &&
        result.enrolments.enrols[0].enrol
      ) {
        result.enrolments.enrols[0].enrol.forEach((enrol, index) => {
          enrol.$.id = index === 0 ? enrol_id1() : enrol_id2();
          enrol.timecreated = jsonContent.timecreated;
          enrol.timemodified = jsonContent.timemodified;
        });
      }

      const updatedXml = builder.buildObject(result);
      resolve(updatedXml);
    });
  });
}

// Function to read, update, and write XML files
const processCourseXmlFile = (jsonFilePath, xmlDirPath) => {

    fs.readFile(jsonFilePath, "utf8", (err, jsonData) => {
      if (err) {
        console.error("Error reading course JSON file:", err);
        return;
      }

      const jsonContentArray = createCourseContent(jsonData);
      const xmlFilePath = path.join(xmlDirPath, "course.xml");
      const enrolmentsXmlFilePath = path.join(xmlDirPath, "enrolments.xml");
      
      fs.readFile(xmlFilePath, "utf8", (err, xmlData) => {
        if (err) {
          console.error("Error reading course XML file:", err);
          return;
        }

        fs.readFile(enrolmentsXmlFilePath, "utf8", (err, enrolmentsXmlData) => {
          if (err) {
            console.error("Error reading enrolments XML file:", err);
            return;
          }

          jsonContentArray.forEach((jsonContent) => {
            updateCourseXmlWithJsonContent(xmlData, jsonContent)
              .then((updatedXml) => {
                fs.writeFile(xmlFilePath, updatedXml, (err) => {
                  if (err) {
                    console.error("Error writing course XML file:", err);
                  } else {
                    console.log("course XML file updated successfully.");
                  }
                });
              })
              .catch((err) => {
                console.error("Error updating course XML content:", err);
              });

            updateEnrolmentsXml(enrolmentsXmlData, jsonContent)
              .then((updatedEnrolmentsXml) => {
                fs.writeFile(
                  enrolmentsXmlFilePath,
                  updatedEnrolmentsXml,
                  (err) => {
                    if (err) {
                      console.error("Error writing enrolments XML file:", err);
                    } else {
                      console.log("Enrolments XML file updated successfully.");
                    }
                  }
                );
              })
              .catch((err) => {
                console.error("Error updating enrolments XML content:", err);
              });
          });
      });
    });
  });
};
exports.processCourseXmlFile = processCourseXmlFile;
