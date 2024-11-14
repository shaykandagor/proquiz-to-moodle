// Generates xml files inside 'course' directory inside 'blocks' folder e.g completion_progress
const { generateBlockXml } = require("./blockXmlFiles/generateBlockXml");
const { generateInforefXml } = require("./blockXmlFiles/generateInforefXml");
const { generateRolesXml } = require("./blockXmlFiles/generateRolesXml");

// course\blocks\completion_progress
function generateBlockFiles (completionProgressDir) {
    generateBlockXml(completionProgressDir);
    generateRolesXml(completionProgressDir);
    generateInforefXml(completionProgressDir);

}

module.exports = { generateBlockFiles };


