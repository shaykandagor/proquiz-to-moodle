const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const groupsJsonFilePath =
  "./exported_data/json/export-file-groups-2024-07-01-11-30-19.json";

// Function to create content from JSON data
const createContent = (data) =>
  JSON.parse(data).wp_data.map(
    ({
      wp_post_id,
      wp_post_title,
      wp_post_name,
      wp_post_content,
      wp_post_date,
      wp_post_modified,
      wp_post_password,
    }) => ({
      id: wp_post_id,
      title: wp_post_title || "",
      description: wp_post_content || "",
      descriptionformat: 1,
      idnumber: "",
      enrolmentkey: wp_post_password || "",
      picture: "",
      hidepicture: 0,
      timecreated: wp_post_date || "",
      timemodified: wp_post_modified || "",
      group_members: [],
    })
  );

// Function to update XML with JSON content
const updateXmlWithJsonContent = (xmlData, jsonContent) => {
  const parser = new xml2js.Parser();
  const builder = new xml2js.Builder({
    xmldec: { standalone: null, encoding: "UTF-8" },
  });

  return new Promise((resolve, reject) => {
    parser.parseString(xmlData, (err, xmlResult) => {
      if (err) {
        return reject(`Error parsing XML: ${err.message}`);
      }

      // Clear existing groups in XML
      xmlResult.groups = { group: [] };

      // Add JSON content to XML
      // Iterates over each group in the jsonContent array and constructs a new XML group object.
      // Each property of the group object from the JSON is mapped to the corresponding XML element.
      jsonContent.forEach((group) => {
        const newGroup = {
          $: { id: group.id.toString() },
          name: [group.title],
          idnumber: [group.idnumber],
          description: [group.description],
          descriptionformat: [group.descriptionformat],
          enrolmentkey: [group.enrolmentkey],
          picture: [group.picture],
          hidepicture: [group.hidepicture],
          timecreated: [group.timecreated],
          timemodified: [group.timemodified],
          group_members: [group.group_members],
        };
        xmlResult.groups.group.push(newGroup);
      });

      const updatedXml = builder.buildObject(xmlResult);
      resolve(updatedXml);
    });
  });
};

// The function reads the original XML file, reads the JSON file, creates content from the JSON data
// Takes two arguments: groupsJsonFilePath (the path to the JSON file)
// FinalDir (the directory where the final XML file will be saved)
// Defines
const buildGroupsXml = (groupsJsonFilePath, finalDir) => {
  const inputXmlFilePath = path.join("output", "mbz", "groups.xml"); // Original file
  const outputXmlFilePath = path.join("final-mbz", "groups.xml"); // Updated file

  // Check if the input XML file exists
  if (!fs.existsSync(inputXmlFilePath)) {
    console.error("Error: Input XML file does not exist at:", inputXmlFilePath);
    return;
  }

  fs.mkdir(finalDir, { recursive: true }, (err) => {
    if (err) {
      console.error("Error creating directory:", err.message);
      return;
    }

    fs.readFile(inputXmlFilePath, "utf8", (err, xmlData) => {
      if (err) {
        console.error(
          "Error reading XML file. Ensure the XML file exists:",
          err.message
        );
        return;
      }

      fs.readFile(groupsJsonFilePath, "utf8", (err, jsonData) => {
        if (err) {
          console.error(
            "Error reading JSON file. Ensure the JSON file exists:",
            err.message
          );
          return;
        }

        const jsonContent = createContent(jsonData);

        updateXmlWithJsonContent(xmlData, jsonContent)
          .then((updatedXml) => {
            fs.writeFile(outputXmlFilePath, updatedXml, "utf8", (err) => {
              if (err) {
                console.error("Error writing updated XML file:", err.message);
                return;
              }
              console.log(
                "Updated XML file has been written to",
                outputXmlFilePath
              );
            });
          })
          .catch((error) => {
            console.error("Error updating XML with JSON content:", error);
          });
      });
    });
  });
};

module.exports = buildGroupsXml;
