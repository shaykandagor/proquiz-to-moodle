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


// Imports for Activities directory
const generateActivitiesFolders = require("./components/activities/generateActivitiesFolders");
const generateAssignXml = require("./components/activities/assign-xml-files/generateAssignXml");
const generateCalendarXml = require("./components/activities/assign-xml-files/generateCalendarXml");
const generateCompetenciesXml = require("./components/activities/assign-xml-files/generateCompetenciesXml");
const generateFiltersXml = require("./components/activities/assign-xml-files/generateFiltersXml");
const generateGradesXml = require("./components/activities/assign-xml-files/generateGradesXml");
const generateGradingXml = require("./components/activities/assign-xml-files/generateGradingXml");
const generateInforefXml = require("./components/activities/assign-xml-files/generateInforefXml");
const generateModuleXml = require("./components/activities/assign-xml-files/generateModuleXml");
const generateAttendanceXml = require("./components/activities/attendance-xml-files/generateAttendanceXml");
const generateAttCalendarXml = require("./components/activities/attendance-xml-files/generateAttCalendarXml");
const generateGradeHistoryXml = require("./components/activities/assign-xml-files/generateAssignGradeHistoryXml");
const generateAttInforefXml = require("./components/activities/attendance-xml-files/generateAttInfoXml");
const generateBoardXml = require("./components/activities/board-xml-files/generateBoardXml");
const generateBoaGradesXml = require("./components/activities/board-xml-files/generateBoaGradesXml");
const generateBoaInforefXml = require("./components/activities/board-xml-files/generateBoaInforefXml");
const generateAssignRolesXml = require("./components/activities/assign-xml-files/generateAssignRolesXml");
const generateAssignGradeHistoryXml = require("./components/activities/assign-xml-files/generateAssignGradeHistoryXml");
const generateChatXml = require("./components/activities/chat-xml-files/generateChatXml");
const generateFeedbackXml = require("./components/activities/feedback-xml-files/generateFeedback");
const generateFolderXml = require("./components/activities/folder-xml-files/generateFolderXml");
const generateFoldInforefXml = require("./components/activities/folder-xml-files/generateFoldInforef");
const generateLabelXml = require("./components/activities/label-xml-files/generateLabelXml");
const generatePageXml = require("./components/activities/page-xml-files/generatePageXml");
const generateQuizXml = require("./components/activities/quiz-xml-files/generateQuixXml");
const generateQuizInforefXml = require("./components/activities/quiz-xml-files/generateQuizInforefXml");
const generateResourceXml = require("./components/activities/resource-xml-files/generateResourceXml");
const generateUrlXml = require("./components/activities/url-xml-files/generateUrlXml");

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

    // Create subdirectories inside 'activities'
    const activitiesDir = path.join(outputDir, 'activities');
    generateActivitiesFolders(activitiesDir);

    // Generate xml files inside "activities" directories
    // activities/assign
    const activitiesAssignDir = path.join(outputDir, 'activities/assign');
    generateAssignXml(activitiesAssignDir);
    generateAssignGradeHistoryXml(activitiesAssignDir);
    generateCalendarXml(activitiesAssignDir);
    generateCompetenciesXml(activitiesAssignDir);
    generateFiltersXml(activitiesAssignDir);
    generateGradesXml(activitiesAssignDir);
    generateGradingXml(activitiesAssignDir);
    generateInforefXml(activitiesAssignDir);
    generateModuleXml(activitiesAssignDir);
    generateAssignRolesXml(activitiesAssignDir);

    // activities/attendance
    const activitiesAttendanceDir = path.join(outputDir, 'activities/attendance');
    generateAttendanceXml(activitiesAttendanceDir);
    generateAttCalendarXml(activitiesAttendanceDir); 
    generateCompetenciesXml(activitiesAttendanceDir);
    generateFiltersXml(activitiesAttendanceDir);
    generateGradesXml(activitiesAttendanceDir);
    generateGradeHistoryXml(activitiesAttendanceDir);
    generateAttInforefXml(activitiesAttendanceDir);
    generateModuleXml(activitiesAttendanceDir);
    generateAssignRolesXml(activitiesAttendanceDir);

    // activities/board
    const activitiesBoardDir = path.join(outputDir, 'activities/board');
    generateBoardXml(activitiesBoardDir);
    generateCalendarXml(activitiesBoardDir);
    generateCompetenciesXml(activitiesBoardDir);
    generateFiltersXml(activitiesBoardDir);
    generateBoaGradesXml(activitiesBoardDir);
    generateGradeHistoryXml(activitiesBoardDir);
    generateBoaInforefXml(activitiesBoardDir);
    generateModuleXml(activitiesBoardDir);
    generateAssignRolesXml(activitiesBoardDir);

    // activities/chat
    const activitiesChatDir = path.join(outputDir, 'activities/chat');
    generateCalendarXml(activitiesChatDir);
    generateChatXml(activitiesChatDir);
    generateCompetenciesXml(activitiesChatDir);
    generateFiltersXml(activitiesChatDir);
    generateBoaGradesXml(activitiesChatDir);
    generateGradeHistoryXml(activitiesChatDir);
    generateBoaInforefXml(activitiesChatDir);
    generateModuleXml(activitiesChatDir);
    generateAssignRolesXml(activitiesChatDir);

    // activities/feedback
    const activitiesFeedbackDir = path.join(outputDir, 'activities/feedback');
    generateCalendarXml(activitiesFeedbackDir);
    generateCompetenciesXml(activitiesFeedbackDir);
    generateFeedbackXml(activitiesFeedbackDir);
    generateFiltersXml(activitiesFeedbackDir);
    generateBoaGradesXml(activitiesFeedbackDir);
    generateAssignGradeHistoryXml(activitiesFeedbackDir);
    generateBoaInforefXml(activitiesFeedbackDir);
    generateModuleXml(activitiesFeedbackDir);
    generateAssignRolesXml(activitiesFeedbackDir);

    // activities/folder
    const activitiesFolderDir = path.join(outputDir, 'activities/folder');
    generateCalendarXml(activitiesFolderDir);
    generateCompetenciesXml(activitiesFolderDir);
    generateFiltersXml(activitiesFolderDir);
    generateFolderXml(activitiesFolderDir);
    generateBoaGradesXml(activitiesFolderDir);
    generateAssignGradeHistoryXml(activitiesFolderDir);
    generateFoldInforefXml(activitiesFolderDir);
    generateModuleXml(activitiesFolderDir);
    generateAssignRolesXml(activitiesFolderDir);

    // activities/label
    const activitiesLabelDir = path.join(outputDir, 'activities/label');
    generateCalendarXml(activitiesLabelDir);
    generateCompetenciesXml(activitiesLabelDir);
    generateFiltersXml(activitiesLabelDir);
    generateBoaGradesXml(activitiesLabelDir);
    generateGradeHistoryXml(activitiesLabelDir);
    generateBoaInforefXml(activitiesLabelDir);
    generateLabelXml(activitiesLabelDir);
    generateModuleXml(activitiesLabelDir);
    generateAssignRolesXml(activitiesLabelDir);

    // activities/page
    const activitiesPageDir = path.join(outputDir, 'activities/page');
    generateCalendarXml(activitiesPageDir);
    generateCompetenciesXml(activitiesPageDir);
    generateFiltersXml(activitiesPageDir);
    generateBoaGradesXml(activitiesPageDir);
    generateGradeHistoryXml(activitiesPageDir);
    generateFoldInforefXml(activitiesPageDir);
    generatePageXml(activitiesPageDir);
    generateModuleXml(activitiesPageDir);
    generateAssignRolesXml(activitiesPageDir);

    // activities/quiz
    const activitiesQuizDir = path.join(outputDir, 'activities/quiz');
    generateCalendarXml(activitiesQuizDir);
    generateCompetenciesXml(activitiesQuizDir);
    generateFiltersXml(activitiesQuizDir);
    generateGradesXml(activitiesQuizDir);
    generateGradeHistoryXml(activitiesQuizDir);
    generateQuizInforefXml(activitiesQuizDir);
    generateModuleXml(activitiesQuizDir);
    generateQuizXml(activitiesQuizDir);
    generateAssignRolesXml(activitiesQuizDir);

    // activities/resource
    const activitiesResourceDir = path.join(outputDir, 'activities/resource');
    generateCalendarXml(activitiesResourceDir);
    generateCompetenciesXml(activitiesResourceDir);
    generateFiltersXml(activitiesResourceDir);
    generateBoaGradesXml(activitiesResourceDir);
    generateGradeHistoryXml(activitiesResourceDir);
    generateFoldInforefXml(activitiesResourceDir);
    generateModuleXml(activitiesResourceDir);
    generateResourceXml(activitiesResourceDir);
    generateAssignRolesXml(activitiesResourceDir);

    // activities/url
    const activitiesUrlDir = path.join(outputDir, 'activities/url');
    generateCalendarXml(activitiesUrlDir);
    generateCompetenciesXml(activitiesUrlDir);
    generateFiltersXml(activitiesUrlDir);
    generateBoaGradesXml(activitiesUrlDir);
    generateGradeHistoryXml(activitiesUrlDir);
    generateFoldInforefXml(activitiesUrlDir);
    generateModuleXml(activitiesUrlDir);
    generateAssignRolesXml(activitiesUrlDir);
    generateUrlXml(activitiesUrlDir);
}

createMoodleBackup("output/mbz");
