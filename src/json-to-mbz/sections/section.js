const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

// Function to create content from JSON data
const createContent = (data) => {
  const jsonData = JSON.parse(data);
  return jsonData.wp_data.map(post => {
      const { wp_post_id, wp_post_content } = post;
      return {
          section_id_attribute: wp_post_id,
          summary: wp_post_content
      };
  });
};

// Function to update section.xml 
const updateSectionXml = (xmlData, jsonContent) => {
  const parser = new xml2js.Parser();
  const builder = new xml2js.Builder({
      xmldec: { standalone: null, encoding: "UTF-8" },
      cdata: true
  });

  const timestamp = Math.floor(Date.now() / 1000);

  return new Promise((resolve, reject) => {
      parser.parseString(xmlData, (err, result) => {
        if (err) {
          return reject(err);
        }

        // Update the XML content
        result.section.$.id = jsonContent.section_id_attribute;
        result.section.summary = jsonContent.summary;
        result.section.sequence = [""];
        result.section.timemodified = [timestamp];
        const updatedXml = builder.buildObject(result);
        resolve(updatedXml);
      });
  });
};

// Function to read, update, and write XML files
const processSectionXmlFiles = (jsonFilePath, outputDir) => {
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }

    const sectionJsonData = createContent(data);

    // Read all directories in the base directory
    fs.readdir(outputDir, (err, directories) => {
      if (err) {
        console.error("Error reading base directory:", err);
        return;
      }

      // Check if 'sections' directory exists in the outputDir
      const sectionsDir = directories.find((dir) => dir === "sections");

      // Proceed with processing the 'sections' directory
      const sectionsPath = path.join(outputDir, sectionsDir);

      // Read all section directories inside the 'sections' folder
      fs.readdir(sectionsPath, (err, sectionDirs) => {
        if (err) {
          console.error("Error reading sections folder:", err);
          return;
        }

        // Filter for directories with "section_" in their names
        const sectionDirsToProcess = sectionDirs.filter((dir) =>
          dir.startsWith("section_")
        );

        // Process each section directory
        sectionDirsToProcess.forEach((sectionDir) => {
          const sectionPath = path.join(sectionsPath, sectionDir);
          const sectionXmlFilePath = path.join(sectionPath, "section.xml");
          const folderId = sectionDir.split("_")[1]; // Extract the folder ID from "section_X"

          // Find the corresponding JSON content based on folderId
          const sectionJsonContent = sectionJsonData.find(
            (content) => content.section_id_attribute == folderId
          );

          // Check if the XML file exists
          if (fs.existsSync(sectionXmlFilePath)) {
            const xmlData = fs.readFileSync(sectionXmlFilePath, "utf8");

            // Update the section XML files
            updateSectionXml(xmlData, sectionJsonContent)
              .then((updatedXml) => {
                console.log("Writing Updated XML to:", sectionXmlFilePath); 
                fs.writeFileSync(sectionXmlFilePath, updatedXml, "utf8");
                console.log(
                  "Updated section XML file successfully:",
                  sectionXmlFilePath
                );
              })
              .catch((err) => {
                console.error("Error updating section XML file:", err);
              });
          } else {
            console.warn("section XML file not found in:", sectionPath);
          }
        });
        console.log("All section XML files processed.");
      });
    });
  });
};

module.exports = processSectionXmlFiles;