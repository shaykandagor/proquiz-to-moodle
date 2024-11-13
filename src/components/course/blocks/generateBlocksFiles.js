const { generateBlockXml } = require("./xmlFiles/generateBlockXml");
const { generateInforefXml } = require("./xmlFiles/generateInforefXml");
const { generateRolesXml } = require("./xmlFiles/generateRolesXml");

// Generates xml files inside 'course' directory inside 'blocks' folder e.g completion_progress
// course\blocks\completion_progress
function generateBlockFiles(completionProgressDir){
    generateBlockXml(completionProgressDir)
    generateInforefXml(completionProgressDir)
    generateRolesXml(completionProgressDir)
}

module.exports = { generateBlockFiles }

