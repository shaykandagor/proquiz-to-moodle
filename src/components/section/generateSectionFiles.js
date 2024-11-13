const { generateSectionXml } = require("./xmlFiles/generateSectionXml");
const { generateInforefXml } = require("./xmlFiles/generateInforefXml");

 // Generates xml files inside 'sections' directory inside 'section' file
function generateSectionFiles(sectionDir){
    generateSectionXml(sectionDir)
    generateInforefXml(sectionDir)
}

module.exports = { generateSectionFiles }