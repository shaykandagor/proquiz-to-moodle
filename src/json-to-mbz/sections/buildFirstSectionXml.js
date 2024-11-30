const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

// Function to extract the first heading and paragraphs from wp_post_content
const extractHeadingAndParagraphs = (content) => {
  const headingMatch = content.match(/<h3>(.*?)<\/h3>/);
  const paragraphMatches = content.match(/<p>(.*?)<\/p>/g);
  return {
    firstHeading: headingMatch && headingMatch[0] ? headingMatch[0].replace(/<\/?h3>/g, '') : "",
    firstParagraph: paragraphMatches && paragraphMatches[0] ? paragraphMatches[0].replace(/<\/?p>/g, '') : "",
    secondParagraph: paragraphMatches && paragraphMatches[1] ? paragraphMatches[1].replace(/<\/?p>/g, '') : ""
  };
};

const createSectionContent = (data) =>
  JSON.parse(data).wp_data.map(
    ({
      wp_post_id,
      wp_post_content,
      wp_post_modified,
    }) => {
      // Extract heading and paragraphs from the post content
      const { firstHeading: heading, firstParagraph, secondParagraph } = extractHeadingAndParagraphs(wp_post_content);
      const summary = `${firstParagraph} ${secondParagraph}`.trim();
      return {
        id: wp_post_id,
        number: "",
        name: heading,
        summary: summary,
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

      // Clear existing section in XML
      xmlResult = { section: [] };

      // Add JSON content to XML
      jsonContent.forEach((section) => {
        const newSection = {
          $: { id: section.id ? section.id.toString() : '' },
          number: [section.number || ''],
          name: [section.name || ''],
          summary: [section.summary || ''],
          summaryformat: [section.summaryformat || ''],
          sequence: [section.sequence || ''],
          visible: [section.visible || ''],
          availabilityjson: [section.availabilityjson || ''],
          timemodified: [section.timemodified || '']
        };
        xmlResult.section = newSection;
      });

      const updatedXml = builder.buildObject(xmlResult);
      resolve(updatedXml);
    });
  });
};


const buildFirstSectionXml = (finalDir, coursesJsonFilePath) => {
  const inputXmlFilePath = path.join("output", "mbz", "sections", "section_12345", "section.xml"); // Original path
  const outputXmlFilePath = path.join(finalDir, "section.xml"); // Updated folder path

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
        console.error("Error reading XML file. Ensure the XML file exists:", err.message);
        return;
      }

      fs.readFile(coursesJsonFilePath, "utf8", (err, jsonData) => {
        if (err) {
          console.error("Error reading JSON file. Ensure the JSON file exists:", err.message);
          return;
        }

        const jsonContent = createSectionContent(jsonData);

        updateXmlWithJsonContent(xmlData, jsonContent)
          .then((updatedXml) => {
            fs.writeFile(outputXmlFilePath, updatedXml, (err) => {
              if (err) {
                console.error("Error writing XML file:", err.message);
                return;
              }
              console.log("XML file updated successfully.");
            });
          })
          .catch((error) => {
            console.error("Error updating XML content:", error.message);
          });
      });
    });
  });
};

module.exports = { buildFirstSectionXml };