const path = require("path");

// Imports for Activities directory
const generateAssignGradeHistoryXml = require("./assign-xml-files/generateAssignGradeHistoryXml");
const generateAssignRolesXml = require("./assign-xml-files/generateAssignRolesXml");
const generateAssignXml = require("./assign-xml-files/generateAssignXml");
const generateCalendarXml = require("./assign-xml-files/generateCalendarXml");
const generateCompetenciesXml = require("./assign-xml-files/generateCompetenciesXml");
const generateFiltersXml = require("./assign-xml-files/generateFiltersXml");
const generateGradesXml = require("./assign-xml-files/generateGradesXml");
const generateGradingXml = require("./assign-xml-files/generateGradingXml");
const generateActivityAssignInforefXml = require("./assign-xml-files/generateInforefXml");
const generateModuleXml = require("./assign-xml-files/generateModuleXml");
const generateAttCalendarXml = require("./attendance-xml-files/generateAttCalendarXml");
const generateAttendanceXml = require("./attendance-xml-files/generateAttendanceXml");
const generateAttInforefXml = require("./attendance-xml-files/generateAttInfoXml");
const generateBoaGradesXml = require("./board-xml-files/generateBoaGradesXml");
const generateBoaInforefXml = require("./board-xml-files/generateBoaInforefXml");
const generateBoardXml = require("./board-xml-files/generateBoardXml");
const generateChatXml = require("./chat-xml-files/generateChatXml");
const generateFeedbackXml = require("./feedback-xml-files/generateFeedback");
const generateFolderXml = require("./folder-xml-files/generateFolderXml");
const generateFoldInforefXml = require("./folder-xml-files/generateFoldInforef");
const generateLabelXml = require("./label-xml-files/generateLabelXml");
const generatePageXml = require("./page-xml-files/generatePageXml");
const generateQuizXml = require("./quiz-xml-files/generateQuixXml");
const generateQuizInforefXml = require("./quiz-xml-files/generateQuizInforefXml");
const generateResourceXml = require("./resource-xml-files/generateResourceXml");
const generateUrlXml = require("./url-xml-files/generateUrlXml");
const generateActivitiesFolders = require("./generateActivitiesFolders");
const generateBookGradesXml = require("./book-xml-files/generateBookGradeXml");

function generateActivitiesFiles(outputDir) {

    // Create subdirectories inside 'activities' directory
    const activitiesDir = path.join(outputDir, 'activities');
    generateActivitiesFolders(activitiesDir);

    // Generate xml files inside "activities" directories
    // activities/assign
    /* const activitiesAssignDir = path.join(outputDir, 'activities/assign');
    generateAssignXml(activitiesAssignDir);
    generateAssignGradeHistoryXml(activitiesAssignDir);
    generateCalendarXml(activitiesAssignDir);
    generateCompetenciesXml(activitiesAssignDir);
    generateFiltersXml(activitiesAssignDir);
    generateGradesXml(activitiesAssignDir);
    generateGradingXml(activitiesAssignDir);
    generateActivityAssignInforefXml(activitiesAssignDir);
    generateModuleXml(activitiesAssignDir);
    generateAssignRolesXml(activitiesAssignDir);
 */
    // activities/attendance
    /* const activitiesAttendanceDir = path.join(outputDir, 'activities/attendance');
    generateAttendanceXml(activitiesAttendanceDir);
    generateAttCalendarXml(activitiesAttendanceDir);
    generateCompetenciesXml(activitiesAttendanceDir);
    generateFiltersXml(activitiesAttendanceDir);
    generateGradesXml(activitiesAttendanceDir);
    generateAssignGradeHistoryXml(activitiesAttendanceDir);
    generateAttInforefXml(activitiesAttendanceDir);
    generateModuleXml(activitiesAttendanceDir);
    generateAssignRolesXml(activitiesAttendanceDir); */

    // activities/board
    /* const activitiesBoardDir = path.join(outputDir, 'activities/board');
    generateBoardXml(activitiesBoardDir);
    generateCalendarXml(activitiesBoardDir);
    generateCompetenciesXml(activitiesBoardDir);
    generateFiltersXml(activitiesBoardDir);
    generateBoaGradesXml(activitiesBoardDir);
    generateAssignGradeHistoryXml(activitiesBoardDir);
    generateBoaInforefXml(activitiesBoardDir);
    generateModuleXml(activitiesBoardDir);
    generateAssignRolesXml(activitiesBoardDir); */

    // activities/chat
    /* const activitiesChatDir = path.join(outputDir, 'activities/chat');
    generateCalendarXml(activitiesChatDir);
    generateChatXml(activitiesChatDir);
    generateCompetenciesXml(activitiesChatDir);
    generateFiltersXml(activitiesChatDir);
    generateBoaGradesXml(activitiesChatDir);
    generateAssignGradeHistoryXml(activitiesChatDir);
    generateBoaInforefXml(activitiesChatDir);
    generateModuleXml(activitiesChatDir);
    generateAssignRolesXml(activitiesChatDir); */

    // activities/feedback
    /* const activitiesFeedbackDir = path.join(outputDir, 'activities/feedback');
    generateCalendarXml(activitiesFeedbackDir);
    generateCompetenciesXml(activitiesFeedbackDir);
    generateFeedbackXml(activitiesFeedbackDir);
    generateFiltersXml(activitiesFeedbackDir);
    generateBoaGradesXml(activitiesFeedbackDir);
    generateAssignGradeHistoryXml(activitiesFeedbackDir);
    generateBoaInforefXml(activitiesFeedbackDir);
    generateModuleXml(activitiesFeedbackDir);
    generateAssignRolesXml(activitiesFeedbackDir); */

    // activities/folder
    /* const activitiesFolderDir = path.join(outputDir, 'activities/folder');
    generateCalendarXml(activitiesFolderDir);
    generateCompetenciesXml(activitiesFolderDir);
    generateFiltersXml(activitiesFolderDir);
    generateFolderXml(activitiesFolderDir);
    generateBoaGradesXml(activitiesFolderDir);
    generateAssignGradeHistoryXml(activitiesFolderDir);
    generateFoldInforefXml(activitiesFolderDir);
    generateModuleXml(activitiesFolderDir);
    generateAssignRolesXml(activitiesFolderDir);
 */
    // activities/label
    /* const activitiesLabelDir = path.join(outputDir, 'activities/label');
    generateCalendarXml(activitiesLabelDir);
    generateCompetenciesXml(activitiesLabelDir);
    generateFiltersXml(activitiesLabelDir);
    generateBoaGradesXml(activitiesLabelDir);
    generateAssignGradeHistoryXml(activitiesLabelDir);
    generateBoaInforefXml(activitiesLabelDir);
    generateLabelXml(activitiesLabelDir);
    generateModuleXml(activitiesLabelDir);
    generateAssignRolesXml(activitiesLabelDir); */

    // activities/page
    const activitiesBookDir = path.join(outputDir, 'activities/book');
    generateAssignGradeHistoryXml(activitiesBookDir);
    generateCalendarXml(activitiesBookDir);
    generateCompetenciesXml(activitiesBookDir);
    generateFiltersXml(activitiesBookDir);
    generateBookGradesXml(activitiesBookDir);
    generateGradingXml(activitiesBookDir);
    generateActivityAssignInforefXml(activitiesBookDir);
    generateModuleXml(activitiesBookDir);
    generateAssignRolesXml(activitiesBookDir);

    // activities/page
    const activitiesPageDir = path.join(outputDir, 'activities/page');
    generateCalendarXml(activitiesPageDir);
    generateCompetenciesXml(activitiesPageDir);
    generateFiltersXml(activitiesPageDir);
    generateBoaGradesXml(activitiesPageDir);
    generateAssignGradeHistoryXml(activitiesPageDir);
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
    generateAssignGradeHistoryXml(activitiesQuizDir);
    generateQuizInforefXml(activitiesQuizDir);
    generateModuleXml(activitiesQuizDir);
    generateQuizXml(activitiesQuizDir);
    generateAssignRolesXml(activitiesQuizDir);

    // activities/resource
    /* const activitiesResourceDir = path.join(outputDir, 'activities/resource');
    generateCalendarXml(activitiesResourceDir);
    generateCompetenciesXml(activitiesResourceDir);
    generateFiltersXml(activitiesResourceDir);
    generateBoaGradesXml(activitiesResourceDir);
    generateAssignGradeHistoryXml(activitiesResourceDir);
    generateFoldInforefXml(activitiesResourceDir);
    generateModuleXml(activitiesResourceDir);
    generateResourceXml(activitiesResourceDir);
    generateAssignRolesXml(activitiesResourceDir); */

    // activities/url
    /* const activitiesUrlDir = path.join(outputDir, 'activities/url');
    generateCalendarXml(activitiesUrlDir);
    generateCompetenciesXml(activitiesUrlDir);
    generateFiltersXml(activitiesUrlDir);
    generateBoaGradesXml(activitiesUrlDir);
    generateAssignGradeHistoryXml(activitiesUrlDir);
    generateFoldInforefXml(activitiesUrlDir);
    generateModuleXml(activitiesUrlDir);
    generateAssignRolesXml(activitiesUrlDir);
    generateUrlXml(activitiesUrlDir); */

}

module.exports = generateActivitiesFiles;