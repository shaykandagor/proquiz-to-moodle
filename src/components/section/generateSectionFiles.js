const { generateInforefXml } = require("./sectionXmlFiles/generateInforefXml");
const { generateSectionXml } = require("./sectionXmlFiles/generateSectionXml");

function generateSectionFiles(sectionDir) {
    generateInforefXml(sectionDir);
    generateSectionXml(sectionDir);
}

module.exports = { generateSectionFiles }