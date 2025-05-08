const generateCompletionXml = require("../../components/generateCompletionXml");
const generateFilesXml = require("../../components/generateFilesXml");
const generateGradehistoryXml = require("../../components/generateGradehistoryXml");
const generateGroupsXml = require("../../components/generateGroupsXml");
const generateMainGradebookXml = require("../../components/generateMainGradebookXml");
const generateMainRolesXml = require("../../components/generateMainRolesXml");
const generateMoodleBackup = require("../../components/generateMoodleBackup");
const generateOutcomesXml = require("../../components/generateOutcomesXml");
const generateQuestionsXml = require("../../components/generateQuestionsXml");
const generateScalesXml = require("../../components/generateScalesXml");

function generateMainFiles(outputDir){
    generateCompletionXml(outputDir);
    generateFilesXml(outputDir);
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