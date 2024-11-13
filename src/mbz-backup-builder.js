const fs = require("fs");
const path = require("path");

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

// Activities directory
const generateActivitiesFolders = require("./components/activities/generateActivitiesFolders");
const generateActivityGradehistoryXml = require("./components/activities/xml-files/generateGradeHistoryXml");
const generateAssignXml = require("./components/activities/xml-files/generateAssignXml");
const generateCalendarXml = require("./components/activities/xml-files/generateCalendarXml");
const generateCompetenciesXml = require("./components/activities/xml-files/generateCompetenciesXml");
const generateFiltersXml = require("./components/activities/xml-files/generateFiltersXml");
const generateGradesXml = require("./components/activities/xml-files/generateGradesXml");
const generateGradingXml = require("./components/activities/xml-files/generateGradingXml");
const generateInforefXml = require("./components/activities/xml-files/generateInforefXml");
const generateModuleXml = require("./components/activities/xml-files/generateModuleXml");
const generateActivitiesRolesXml = require("./components/activities/xml-files/generateRolesXml");

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

    // Create subdirectories inside 'activities'
    const activitiesDir = path.join(outputDir, 'activities'); 
    generateActivitiesFolders(activitiesDir);

    // Create xml files
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

    // Generate xml files inside "activities" directories
    // activities/assign
    const activitiesAssignDir = path.join(outputDir, 'activities/assign');
    generateAssignXml(activitiesAssignDir);
    generateActivityGradehistoryXml(activitiesAssignDir);
    generateCalendarXml(activitiesAssignDir);
    generateCompetenciesXml(activitiesAssignDir);
    generateFiltersXml(activitiesAssignDir);
    generateGradesXml(activitiesAssignDir);
    generateGradingXml(activitiesAssignDir);
    generateInforefXml(activitiesAssignDir);
    generateModuleXml(activitiesAssignDir);
    generateActivitiesRolesXml(activitiesAssignDir);

}
    // creates files inside 'course' directory
    generateCourseFiles(courseDir);

    // creates files inside 'course' directory inside 'blocks' folder inside 'completion_progress'
    generateBlockFiles(completionProgressDir)

    // creates files inside 'sections' directory inside 'section' file
    generateSectionFiles(sectionDir)

}

createMoodleBackup("output/mbz");
