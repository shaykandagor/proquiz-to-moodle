const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const createSectionContent = (data) =>
    JSON.parse(data).wp_data.map(
        ({
            wp_post_id,
            wp_post_title,
            wp_post_content,
            wp_post_modified,
          }) => ({
            id: wp_post_id,
            number: "",
            name: wp_post_title || "",
            summary: wp_post_content || "",
            summaryformat: 1,
            sequence: "",
            visible: "",
            hidepicture: 0,
            availabilityjson: "",
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

        // Clear existing sections in XML
        xmlResult.sections = { section: [] };
  
        // Add JSON content to XML
        // Iterates over each group in the jsonContent array and constructs a new XML group object.
        // Each property of the group object from the JSON is mapped to the corresponding XML element.
        jsonContent.forEach((section) => {
            const newSection = {
                $: { id: section.id.toString() },
                number: [section.number],
                name: [section.name],
                summary: [section.summary],
                summaryformat: [section.summaryformat],
                sequence: [section.sequence],
                visible: [section.visible],
                availabilityjson: [section.availabilityjson],
                timemodified: [section.timemodified],
            };
            xmlResult.sections.section.push(newSection);
          
        });
  
        const updatedXml = builder.buildObject(xmlResult);
        resolve(updatedXml);
      });
    });
  };
  

// Function to build section XML
const buildSectionXml = (sectionJsonFilePath, sectionId) => {
    const inputXmlFilePath = path.join("output", "mbz", "sections", "section_12345", "section.xml"); // Original path
    const outputSectionFolderPath = path.join("final-mbz", "sections", `section_${sectionId}`); // Updated folder path
    const outputXmlFilePath = path.join(outputSectionFolderPath, "section.xml"); // Updated file path

    // Check if the input XML file exists
    if (!fs.existsSync(inputXmlFilePath)) {
        console.error("Error: Input XML file does not exist at:", inputXmlFilePath);
        return;
    }
  
    if (!fs.existsSync(outputSectionFolderPath)) {
      fs.mkdirSync(outputSectionFolderPath, { recursive: true });
    }
  
    // Check if the input XML file exists
    if (!fs.existsSync(inputXmlFilePath)) {
      console.error("Error: Input XML file does not exist at:", inputXmlFilePath);
      return;
    }
  
    fs.readFile(inputXmlFilePath, "utf8", (err, xmlData) => {
      if (err) {
        console.error("Error reading XML file. Ensure the XML file exists:", err.message);
        return;
      }
  
      fs.readFile(sectionJsonFilePath, "utf8", (err, jsonData) => {
        if (err) {
          console.error(
            "Error reading JSON file. Ensure the JSON file exists:",
            err.message
          );
          return;
        }

        const jsonContent = createSectionContent(jsonData);

  
        updateXmlWithJsonContent(xmlData, jsonContent)
          .then((updatedXml) => {
            fs.writeFile(outputXmlFilePath, updatedXml, "utf8", (err) => {
              if (err) {
                console.error("Error writing updated XML file:", err.message);
                return;
              }
              console.log("Updated XML file has been written to", outputXmlFilePath);
            });
          })
          .catch((error) => {
            console.error("Error updating XML with JSON content:", error);
          });
      });
    });
  };


module.exports = { buildSectionXml };