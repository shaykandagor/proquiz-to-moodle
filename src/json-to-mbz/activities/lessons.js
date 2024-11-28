const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const he = require("he"); // Import the he library for encoding HTML entities
const createActivitiesFolders = require("./create-activities-folders");

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
    processXmlFiles(lessonsJsonFilePath, path.join(finalDir, "activities"));
    console.log("XMLs created ", finalDir);
  });
}

const generateRandomNumber = () => parseInt(Math.random() * 10000000);
const att_id = () => parseInt(Math.random() * 20000);

// Function to create content from JSON data
const createContent = (data) => {
  const jsonData = JSON.parse(data);
  return jsonData.wp_data.map((post) => {
    const {
      wp_post_id,
      wp_post_title,
      wp_post_content,
      wp_post_date_gmt,
    } = post;

    const context_id = generateRandomNumber();
    const page_id = att_id();

    return {
      moduleid: wp_post_id,
      name: wp_post_title,
      content: wp_post_content,
      timemodified: wp_post_date_gmt,
      contentformat: 1,
      legacyfiles: 0,
      legacyfileslast: "$@NULL@$",
      display: 5,
      displayoptions: {
        printintro: 0,
        printlastmodified: 1,
      },
      revision: 1,
      id: page_id,
      contextid: context_id
    };
  });
};

// Function to update XML with JSON content
const updateXmlWithJsonContent = (xmlData, jsonContent) => {
  const parser = new xml2js.Parser();
  const builder = new xml2js.Builder({
    xmldec: { standalone: null, encoding: "UTF-8" },
  });

  return new Promise((resolve, reject) => {
    parser.parseString(xmlData, (err, result) => {
      if (err) {
        return reject(err);
      }
      // TODO: Fix XML content 
      // Encode the HTML content for XML
      const encodedContent = he.encode(jsonContent.content, {
        useNamedReferences: true,  // Use named entities like &lt; for readability
        allowUnsafeSymbols: true  // Allow characters like '>' and '"'
      });

      // Update the XML content with JSON content
      result.activity.$.id = jsonContent.id;
      result.activity.$.moduleid = jsonContent.moduleid;
      result.activity.$.contextid = jsonContent.contextid;
      result.activity.page[0].$.id= jsonContent.id;
      result.activity.page[0].name[0] = jsonContent.name;
      result.activity.page[0].intro[0] = "";
      result.activity.page[0].introformat[0] = jsonContent.contentformat;
      result.activity.page[0].content[0] = jsonContent.content;
      result.activity.page[0].contentformat[0] = jsonContent.contentformat;
      result.activity.page[0].legacyfiles[0] = jsonContent.legacyfiles;
      result.activity.page[0].legacyfileslast[0] = jsonContent.legacyfileslast;
      result.activity.page[0].display[0] = jsonContent.display;
      result.activity.page[0].displayoptions[0] = JSON.stringify(jsonContent.displayoptions);
      result.activity.page[0].revision[0] = jsonContent.revision;
      result.activity.page[0].timemodified[0] = jsonContent.timemodified;

      const updatedXml = builder.buildObject(result);
      resolve(updatedXml);
    });
  });
};

// Function to read, update, and write XML files
const processXmlFiles = (jsonFilePath, xmlDirPath) => {
  fs.readFile(jsonFilePath, "utf8", (err, jsonData) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }

    const jsonContentArray = createContent(jsonData);

    jsonContentArray.forEach((jsonContent) => {
      const xmlFilePath = path.join(xmlDirPath, `page_${jsonContent.moduleid}`, "page.xml");

      fs.readFile(xmlFilePath, "utf8", (err, xmlData) => {
        if (err) {
          console.error("Error reading XML file:", err);
          return;
        }

        updateXmlWithJsonContent(xmlData, jsonContent)
          .then((updatedXml) => {
            fs.writeFile(xmlFilePath, updatedXml, "utf8", (err) => {
              if (err) {
                console.error("Error writing XML file:", err);
                return;
              }
              console.log(`Updated XML file: ${xmlFilePath}`);
            });
          })
          .catch((err) => {
            console.error("Error updating XML content:", err);
          });
      });
    });
  });
};

module.exports = buildLessonsXml;