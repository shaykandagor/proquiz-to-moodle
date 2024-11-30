const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

const createContent = (data) => {
    const jsonData = JSON.parse(data);
    return jsonData.wp_data.map((post) => {

        const { wp_post_id, wp_post_content } = post;

        return {
            section_id_attribute: wp_post_id,
            summary: wp_post_content
        };
    });
}

// Function to update module.xml with static content
const updateSectionXml = (xmlData, jsonContent, folderId) => {
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

      // Update the XML content with static values
      result.section.$.id = folderId;
      result.section.number = ["0"]; 
      result.section.name = ["$@NULL@$"]; 
      result.section.summary = jsonContent[0].summary;
      result.section.summaryformat = ["1"]; 
      result.section.sequence = [""]; 
      result.section.visible = ["1"]; 
      result.section.availabilityjson = ["$@NULL@$"]; 
      result.section.timemodified = [timestamp]; 

      const updatedXml = builder.buildObject(result);
      resolve(updatedXml);
    });
  });
};

// Function to read, update, and write XML files
const processSectionXmlFiles = (jsonFilePath, outputDir) => {
    fs.readFile(jsonFilePath, "utf8", (err, jsonData) => {
        if (err) {
            console.error("Error reading course JSON file:", err);
            return;
        }

        const contentArray = createContent(jsonData);

        // Read all directories in the base directory
        fs.readdir(outputDir, (err, directories) => {
            if (err) {
                console.error("Error reading base directory:", err);
                return;
            }

            // Filter for directories with "section_id" in their names
            const sectionDirs = directories.filter((dir) =>
                dir.startsWith("section_")
            );

          // Process each section directory
          sectionDirs.forEach((sectionDir) => {
              const sectionPath = path.join(outputDir, sectionDir);
              const sectionXmlFilePath = path.join(sectionPath, "section.xml"); 
              const folderId = sectionDir.split("_")[1]; // Extract the folder ID from "section_id"

              // Check if the XML file exists
              if (fs.existsSync(sectionXmlFilePath)) {
              const xmlData = fs.readFileSync(sectionXmlFilePath, "utf8");

              // Update the section XML files
              updateSectionXml(xmlData, contentArray, folderId)
                .then((updatedXml) => {
                    fs.writeFileSync(sectionXmlFilePath, updatedXml, "utf8");
                    console.log("Updated section XML file successfully:", sectionXmlFilePath);
                })
                .catch((err) => {
                    console.error("Error updating section XML file:", err);
                });

              } else {
                  console.warn("section XML file not found in:", sectionPath);
              }
            });
        });
    });
}

module.exports = processSectionXmlFiles;