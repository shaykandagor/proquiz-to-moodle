const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

// Function to extract the first and second headings, paragraphs, and lists from wp_post_content
const extractHeadingsAndParagraphs = (content) => {
  const headingMatches = content.match(/<h3>(.*?)<\/h3>/g);
  const paragraphMatches = content.match(/<p>(.*?)<\/p>/g);
  const listMatches = content.match(/<li>(.*?)<\/li>/g);
  return {
    firstHeading: headingMatches && headingMatches[0] ? headingMatches[0].replace(/<\/?h3>/g, '') : "",
    secondHeading: headingMatches && headingMatches[1] ? headingMatches[1].replace(/<\/?h3>/g, '') : "",
    firstParagraph: paragraphMatches && paragraphMatches[0] ? paragraphMatches[0].replace(/<\/?p>/g, '') : "",
    secondParagraph: paragraphMatches && paragraphMatches[1] ? paragraphMatches[1].replace(/<\/?p>/g, '') : "",
    thirdParagraph: paragraphMatches && paragraphMatches[2] ? paragraphMatches[2].replace(/<\/?p>/g, '') : "",
    fourthParagraph: paragraphMatches && paragraphMatches[3] ? paragraphMatches[3].replace(/<\/?p>/g, '') : "",
    fifthParagraph: paragraphMatches && paragraphMatches[4] ? paragraphMatches[4].replace(/<\/?p>/g, '') : "",
    list: listMatches ? listMatches.map(item => item.replace(/<\/?li>/g, '')) : []
  };
};

const createSectionContent = (data) =>
  JSON.parse(data).wp_data.map(
    ({
      wp_post_id,
      wp_post_content,
      wp_post_modified,
    }) => {
      const { secondHeading, thirdParagraph, fourthParagraph, fifthParagraph, list } = extractHeadingsAndParagraphs(wp_post_content);
      const summary = `${thirdParagraph} ${fourthParagraph} ${fifthParagraph} ${list.join(', ')}`.trim();
      return {
        id: wp_post_id,
        number: "",
        name: secondHeading, // Use the second heading here
        summary: summary,
        summaryformat: 1,
        sequence: "",
        visible: "",
        hidepicture: 0,
        availabilityjson: "",
        timemodified: wp_post_modified || "",
        group_members: [],
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
const buildSecondSectionXml = (sectionJsonFilePath, sectionId) => {
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

      const sectionContent = createSectionContent(jsonData);

      updateXmlWithJsonContent(xmlData, sectionContent)
        .then((updatedXml) => {
          if (!fs.existsSync(outputSectionFolderPath)) {
            fs.mkdirSync(outputSectionFolderPath, { recursive: true });
          }

          fs.writeFile(outputXmlFilePath, updatedXml, (err) => {
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



module.exports = { buildSecondSectionXml };