const path = require("path");

const {
  generateSectionsInforefXml,
} = require("./sectionXmlFiles/generateInforefXml");
const { generateSectionXml } = require("./sectionXmlFiles/generateSectionXml");
const { generateSectionFolders } = require("./generateSectionFolder");

function generateSectionFiles(outputDir) {
  
  // Create subdirectories inside 'sections' directory
  const sectionsDir = path.join(outputDir, 'sections');
  const numberFolders = 3; // Number of folders to create
  generateSectionFolders(sectionsDir, numberFolders, generateSectionsInforefXml, generateSectionXml);
}

module.exports = { generateSectionFiles };