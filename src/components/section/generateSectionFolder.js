const fs = require("fs");
const path = require("path");
const { generateSectionsInforefXml } = require("./sectionXmlFiles/generateInforefXml");
const { generateSectionXml } = require("./sectionXmlFiles/generateSectionXml");

// Defines 'sections' path
const outputDir = path.join(__dirname, "..", "output", "mbz");
const sectionsDir = path.join(outputDir, 'sections');

// Ensure the sections directory exists
if (!fs.existsSync(sectionsDir)) {
    fs.mkdirSync(sectionsDir, { recursive: true });
}

function generateSectionFolders(sectionsDir, numberFolders) {
    const defaultId = 12345; // Default section ID

    // Loop to create the specified number of folders
    for (let i = 0; i < numberFolders; i++) {
        const currentId = defaultId + i;
        const dir = `${sectionsDir}/section_${currentId}`;

        // Ensure the section directory exists
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Create section.xml and info.xml files
        generateSectionsInforefXml(dir, currentId);
        generateSectionXml(dir, currentId);
    }
}

module.exports = { generateSectionFolders };