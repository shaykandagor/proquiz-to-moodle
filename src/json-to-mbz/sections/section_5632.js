const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

// Function to extract the first, second, and third headings from wp_post_content
const extractHeadingsAndParagraphs = (content) => {
  const headingMatches = content.match(/<h3>(.*?)<\/h3>/g);
  const paragraphMatches = content.match(/<p>(.*?)<\/p>/g);
  return {
    firstHeading: headingMatches && headingMatches[0] ? headingMatches[0].replace(/<\/?h3>/g, '') : "",
    secondHeading: headingMatches && headingMatches[1] ? headingMatches[1].replace(/<\/?h3>/g, '') : "",
    thirdHeading: headingMatches && headingMatches[2] ? headingMatches[2].replace(/<\/?h3>/g, '') : "",
  };
};

const createSectionContent = (data) =>
  JSON.parse(data).wp_data.map(
    ({
      wp_post_id,
      wp_post_content,
      wp_post_modified,
    }) => {
      const { thirdHeading } = extractHeadingsAndParagraphs(wp_post_content);
      return {
        id: wp_post_id,
        number: "",
        name: thirdHeading, // Use the third heading here
        summary: "", // No summary for this section
        summaryformat: 1,
        sequence: "",
        visible: "",
        hidepicture: 0,
        availabilityjson: "",
        timemodified: wp_post_modified || "",
      };
    }
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

      // Add new sections from JSON content
      xmlResult.sections.section = jsonContent;

      const updatedXml = builder.buildObject(xmlResult);
      resolve(updatedXml);
    });
  });
};

// Function to build section XML
const buildThirdSection = (sectionJsonFilePath, sectionId) => {
  const inputXmlFilePath = path.join("output", "mbz", "sections", "section_12345", "section.xml"); // Original path
  const outputSectionFolderPath = path.join("final-mbz", "sections", `section_${sectionId}`); // Updated folder path
  const outputXmlFilePath = path.join(outputSectionFolderPath, "section.xml"); // Updated file path

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
        console.error("Error reading JSON file. Ensure the JSON file exists:", err.message);
        return;
      }

      const jsonContent = createSectionContent(jsonData);

      updateXmlWithJsonContent(xmlData, jsonContent)
        .then((updatedXml) => {
          if (!fs.existsSync(outputSectionFolderPath)) {
            fs.mkdirSync(outputSectionFolderPath, { recursive: true });
          }

          fs.writeFile(outputXmlFilePath, updatedXml, "utf8", (err) => {
            if (err) {
              console.error("Error writing updated XML file:", err.message);
            } else {
              console.log("Updated XML file has been written to:", outputXmlFilePath);
            }
          });
        })
        .catch((error) => {
          console.error("Error updating XML with JSON content:", error);
        });
    });
  });
};

module.exports = {
  buildThirdSection,
};