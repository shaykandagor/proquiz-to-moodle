const createSectionFolder = require("../../json-to-mbz/sections/create-section-folder");
const {
  generateSectionsInforefXml,
} = require("./sectionXmlFiles/generateInforefXml");
const { generateSectionXml } = require("./sectionXmlFiles/generateSectionXml");

function generateSectionFiles(sectionDir) {
  const id = 12345; // TODO: Replace with the section ID

  const dir = `${sectionDir}/section_${id}`;

  // generates section_<ID> folder in the sections folder
  createSectionFolder(id);

  generateSectionsInforefXml(dir, id);
  generateSectionXml(dir, id);
}

module.exports = { generateSectionFiles };
