const fs = require("fs").promises;
const path = require("path");
const xml2js = require("xml2js");

// Function to create content from JSON data
const createContent = async (data) => {
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
const updateSectionXml = async (xmlData, jsonContent) => {
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
const processSectionXmlFiles = async (jsonFilePath, outputDir) => {
  try {
    console.log("Processing section XML files...");

    // Step 1: Read and parse JSON data
    const jsonData = await fs.readFile(jsonFilePath, "utf8");
    const sectionJsonData = await createContent(jsonData); 

    // Step 2: Locate the 'sections' directory
    const directories = await fs.readdir(outputDir);
    const sectionsDir = directories.find((dir) => dir === "sections");
    if (!sectionsDir) {
      console.error("No 'sections' directory found in:", outputDir);
      return;
    }

    const sectionsPath = path.join(outputDir, sectionsDir);

    // Step 3: Read all directories in the 'sections' folder
    const sectionDirs = await fs.readdir(sectionsPath);
    const sectionDirsToProcess = sectionDirs.filter((dir) =>
      dir.startsWith("section_")
    );

    // Step 4: Process each section directory
    for (const sectionDir of sectionDirsToProcess) {
      const sectionPath = path.join(sectionsPath, sectionDir);
      const sectionXmlFilePath = path.join(sectionPath, "section.xml");
      const folderId = sectionDir.split("_")[1]; // Extract the folder ID from "section_X"

      // Find the corresponding JSON content based on folderId
      const sectionJsonContent = sectionJsonData.find(
        (content) => content.section_id_attribute == folderId
      );

      if (!sectionJsonContent) {
        console.warn(`No JSON content found for section: ${folderId}`);
        continue;
      }

      // Check if the XML file exists
      try {
        const xmlData = await fs.readFile(sectionXmlFilePath, "utf8");

        // Update the section XML file
        const updatedXml = await updateSectionXml(xmlData, sectionJsonContent);
        await fs.writeFile(sectionXmlFilePath, updatedXml, "utf8");
        console.log(
          "Updated section XML file successfully:",
          sectionXmlFilePath
        );
      } catch (err) {
        console.error(
          "Error processing XML file for section:",
          sectionPath,
          err
        );
      }
    }

    console.log("All section XML files processed.");
  } catch (err) {
    console.error("Error in processSectionXmlFiles:", err);
  }
};

module.exports = processSectionXmlFiles;