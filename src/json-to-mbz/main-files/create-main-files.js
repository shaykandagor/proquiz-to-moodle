const { generateCompletiondefaultsXml } = require("../../components/course/courseXmlFiles/generateCompletiondefaultsXml");
const generateGradehistoryXml = require("../../components/generateGradehistoryXml");
const generateGroupsXml = require("../../components/generateGroupsXml");
const generateMainCompletionXml = require("../../components/generateMainCompletionXml");
const generateMainFilesXml = require("../../components/generateMainFilesXml");
const generateMainGradebookXml = require("../../components/generateMainGradebookXml");
const generateMainRolesXml = require("../../components/generateMainRolesXml");
const generateMoodleBackup = require("../../components/generateMoodleBackup");
const generateOutcomesXml = require("../../components/generateOutcomesXml");
const generateQuestionsXml = require("../../components/generateQuestionsXml");
const generateScalesXml = require("../../components/generateScalesXml");

function generateMainFiles(outputDir){
    generateMainCompletionXml(outputDir);
    generateMainFilesXml(outputDir);
    generateMainGradebookXml(outputDir);
    generateGradehistoryXml(outputDir);
    generateGroupsXml(outputDir);
    generateMoodleBackup(outputDir);
    generateOutcomesXml(outputDir);
    generateQuestionsXml(outputDir);
    generateMainRolesXml(outputDir);
    generateScalesXml(outputDir);

    console.log("Main files created successfully");
}

module.exports = generateMainFiles;