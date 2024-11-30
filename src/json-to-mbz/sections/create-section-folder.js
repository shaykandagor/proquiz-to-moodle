const fs = require("fs");
const path = require("path");
const { buildFirstSectionXml } = require("./buildFirstSectionXml");
const { buildSecondSectionXml } = require("./buildSecondSectionXml");
const { buildThirdSectionXml } = require("./buildThirdSectionXml");
const { generateSectionsInforefXml } = require("../../components/section/sectionXmlFiles/generateInforefXml");

function createSectionsFolders(sectionsDir, coursesJsonFilePath, numberFolders) {
    // Read the JSON file to fetch the starting ID
    const jsonData = fs.readFileSync(coursesJsonFilePath, "utf8");
    const jsonContent = JSON.parse(jsonData);
    const wp_post_id = jsonContent.wp_data[0].wp_post_id; // Starting ID for the sections

    if (typeof wp_post_id !== 'number' || isNaN(wp_post_id)) {
        console.error("Invalid wp_post_id in JSON file");
        return;
    }

    const tempDir = path.join(sectionsDir, 'temp');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }
    generateSectionsInforefXml(tempDir, wp_post_id);

    // Path to the generated infoRef.xml
    const infoRefFilePath = path.join(tempDir, 'infoRef.xml');

    // Loop to create the specified number of folders
    for (let i = 0; i < numberFolders; i++) {
        const currentId = wp_post_id + i;
        console.log(`Creating section folder for ID: ${currentId}`); // Debugging line
        const dir = path.join(sectionsDir, `section_${currentId}`);

        // Ensure the section directory exists
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Copy the infoRef.xml file to each section directory
        const targetInfoRefFilePath = path.join(dir, 'infoRef.xml');
        fs.copyFileSync(infoRefFilePath, targetInfoRefFilePath);

        // Create section.xml files
        buildFirstSectionXml(dir, coursesJsonFilePath, currentId);
        buildSecondSectionXml(dir, coursesJsonFilePath, currentId);
        buildThirdSectionXml(dir, coursesJsonFilePath, currentId);
    }
}

module.exports = { createSectionsFolders };