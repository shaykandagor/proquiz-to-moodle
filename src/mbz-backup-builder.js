const fs = require("fs");
const path = require("path");

const generateQuestionsXml = require('./components/generateQuestionsXml');
const generateMoodleBackup = require('./components/generateMoodleBackup');
const generateOutcomesXml = require('./components/generateOutcomes');
const generateRolesXml = require('./components/generateRoles');
const generateScalesXml = require('./components/generateScales');
const { generateCompletionXml } = require("./components/generateCompletionXml");
const { generateFilesXml } = require("./components/generateFilesXml");
const { generateGradehistoryXml } = require("./components/generateGradehistoryXml");
const { generateGradebookXml } = require("./components/generateGradebookXml");
const { generateGroupsXml } = require("./components/generateGroupsXml");


function createMoodleBackup(outputDir) {
  // Create subdirectories
  const backupDirs = ["activities", "course", "files", "sections"];

  // Ensure the output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Create subdirectories
  backupDirs.forEach((dir) => {
    const dirPath = path.join(outputDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });

    generateCompletionXml(outputDir);
    generateFilesXml(outputDir);
    generateGradebookXml(outputDir);
    generateGradehistoryXml(outputDir);
    generateGroupsXml(outputDir);
    generateMoodleBackup(outputDir);
    generateMoodleBackup(outputDir);
    generateOutcomesXml(outputDir);
    generateQuestionsXml(outputDir);
    generateRolesXml(outputDir);
    generateScalesXml(outputDir);

}




createMoodleBackup("output/mbz");
