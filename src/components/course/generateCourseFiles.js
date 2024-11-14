const { generateCalendarXml } = require("./courseXmlFiles/generateCalendarXml");
const { generateCompetenciesXml } = require("./courseXmlFiles/generateCompetenciesXml");
const { generateCompletiondefaultsXml } = require("./courseXmlFiles/generateCompletiondefaultsXml");
const { generateContentbankXml } = require("./courseXmlFiles/generateContentbankXml");
const { generateCourseXml } = require("./courseXmlFiles/generateCourseXml");
const { generateEnrolmentXml } = require("./courseXmlFiles/generateEnrolmentXml");
const { generateInforefXml } = require("./courseXmlFiles/generateInforefXml");
const { generateFiltersXml } = require("./courseXmlFiles/generateFiltersXml");
const { generateRolesXml } = require("./courseXmlFiles/generateRolesXml");

// Generates xml files inside 'course' directory
function generateCourseFiles (courseDir) {
    generateCalendarXml(courseDir);
    generateCompetenciesXml(courseDir);
    generateCompletiondefaultsXml(courseDir);
    generateContentbankXml(courseDir);
    generateCourseXml(courseDir);
    generateEnrolmentXml(courseDir);
    generateFiltersXml(courseDir);
    generateInforefXml(courseDir);
    generateRolesXml(courseDir);

}

module.exports = { generateCourseFiles };