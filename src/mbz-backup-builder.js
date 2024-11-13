const fs = require("fs");
const path = require("path");
const { title } = require("process");
const xmlbuilder = require("xmlbuilder");

const generateQuestionsXml = require('./components/generateQuestionsXml');
const generateMoodleBackup = require('./components/generateMoodleBackup');
const generateOutcomesXml = require('./components/generateOutcomesXml');
const generateRolesXml = require('./components/generateRolesXml');
const generateScalesXml = require('./components/generateScalesXml');
const { generateCompletionXml } = require("./components/generateCompletionXml");
const { generateFilesXml } = require("./components/generateFilesXml");
const { generateGradehistoryXml } = require("./components/generateGradehistoryXml");
const { generateGradebookXml } = require("./components/generateGradebookXml");
const { generateGroupsXml } = require("./components/generateGroupsXml");
const { generateCourseFiles } = require("./components/course/generateCourseFiles");
const { generateSectionFiles } = require("./components/section/generateSectionFiles");
const { generateBlockFiles } = require("./components/course/blocks/generateBlocksFiles");



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

    // Create directories
    const courseDir = path.join(outputDir, 'course');
    const blocksDir = path.join(courseDir, 'blocks');
    const completionProgressDir = path.join(blocksDir, 'completion_progress');
    const sectionsDir = path.join(outputDir, 'sections');
    const sectionDir = path.join(sectionsDir, 'section');

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

    // creates files inside 'course' directory
    generateCourseFiles(courseDir);

    // creates files inside 'course' directory inside 'blocks' folder inside 'completion_progress'
    generateBlockFiles(completionProgressDir)

    // creates files inside 'sections' directory inside 'section' file
    generateSectionFiles(sectionDir)

}

createMoodleBackup("output/mbz");
