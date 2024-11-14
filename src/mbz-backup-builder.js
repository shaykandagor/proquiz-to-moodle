const fs = require("fs");
const path = require("path");

// Imports for Main xml files
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

// Imports for Courses directory
const { generateCourseFiles } = require("./components/course/generateCourseFiles");

// Imports for Section directory
const { generateSectionFiles } = require("./components/section/generateSectionFiles");

// Imports for Activities directory
const generateActivitiesFiles = require("./components/activities/generateActivitiesFiles");
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

    // Generate xml files inside "main" directory
    generateCompletionXml(outputDir);
    generateFilesXml(outputDir);
    generateGradebookXml(outputDir);
    generateGradehistoryXml(outputDir);
    generateGroupsXml(outputDir);
    generateMoodleBackup(outputDir);
    generateOutcomesXml(outputDir);
    generateQuestionsXml(outputDir);
    generateRolesXml(outputDir);
    generateScalesXml(outputDir);

    // Generate xml files inside "activities" directories
    // activities/assign
    generateActivitiesFiles(outputDir);

    // Generate xml files inside "activities" directories
    // activities/assign
    generateActivitiesFiles(outputDir);

    // Creates xml files inside 'course' directory 
    const courseDir = path.join(outputDir, 'course');
    generateCourseFiles(courseDir);
    
    // Creates subdirectory inside 'course'
    // course/blocks
    const blocksDir = path.join(courseDir, 'blocks');
    
    // Creates subdirectory inside 'blocks' directory 'completion_progress'
    // courses/blocks/completion_progress
    const completionProgressDir = path.join(blocksDir, 'completion_progress');
    generateBlockFiles(completionProgressDir);
    
    // Generate xml files in courses/blocks/completion_progress
    
    // Creates subdirectries inside 'sections'
    const sectionsDir = path.join(outputDir, 'sections');

    // Creates subdirectories inside 'sections'
    // sections/section
    const sectionDir = path.join(sectionsDir, 'section');
    generateSectionFiles(sectionDir);

    // Create subdirectories inside 'activities'
   /*  const activitiesDir = path.join(outputDir, 'activities');
    generateActivitiesFolders(activitiesDir); */

}

createMoodleBackup("output/mbz");
