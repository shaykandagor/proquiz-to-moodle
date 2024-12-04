const { generateCompletiondefaultsXml } = require("../../components/course/courseXmlFiles/generateCompletiondefaultsXml");
const { generateCourseInforefXml } = require("../../components/course/courseXmlFiles/generateCourseInforefXml");
const generateCourseXml = require("../../components/course/courseXmlFiles/generateCourseXml");
const generateEnrolmentXml = require("../../components/course/courseXmlFiles/generateEnrolmentXml");
const { generateRolesXml } = require("../../components/course/courseXmlFiles/generateRolesXml");

async function generateCoursefiles(outputDir) {
    generateCourseXml(outputDir);
    generateEnrolmentXml(outputDir);
    generateCourseInforefXml(outputDir);
    generateRolesXml(outputDir);
    generateCompletiondefaultsXml(outputDir);
}

module.exports = generateCoursefiles;

