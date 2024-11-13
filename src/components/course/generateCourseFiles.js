const { generateCalendarXml } = require("./xmlFiles/generateCalendarXml");
const { generateCompetenciesXml } = require("./xmlFiles/generateCompetenciesXml");
const { generateCompletiondefaultsXml } = require("./xmlFiles/generateCompletiondefaultsXml");
const { generateContentbankXml } = require("./xmlFiles/generateContentbankXml");
const { generateCourseXml } = require("./xmlFiles/generateCourseXml");
const { generateEnrolmentXml } = require("./xmlFiles/generateEnrolmentXml");
const { generateInforefXml } = require("./xmlFiles/generateInforefXml");
const { generateFiltersXml } = require("./xmlFiles/generateFiltersXml");
const { generateRolesXml } = require("./xmlFiles/generateRolesXml");

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