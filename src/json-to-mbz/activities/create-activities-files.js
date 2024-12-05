const fs = require("fs");
const path = require("path");
const generateAssignGradeHistoryXml = require("../../components/activities/assign-xml-files/generateAssignGradeHistoryXml");
const generateCalendarXml = require("../../components/activities/assign-xml-files/generateCalendarXml");
const generateCompetenciesXml = require("../../components/activities/assign-xml-files/generateCompetenciesXml");
const generateFiltersXml = require("../../components/activities/assign-xml-files/generateFiltersXml");
const generateBookGradesXml = require("../../components/activities/book-xml-files/generateBookGradeXml");
const generateActivityAssignInforefXml = require("../../components/activities/assign-xml-files/generateInforefXml");
const generateModuleXml = require("../../components/activities/assign-xml-files/generateModuleXml");
const generateAssignRolesXml = require("../../components/activities/assign-xml-files/generateAssignRolesXml");
const generateBoaGradesXml = require("../../components/activities/board-xml-files/generateBoaGradesXml");
const generateFoldInforefXml = require("../../components/activities/folder-xml-files/generateFoldInforef");
const generateBookXml = require("../../components/activities/book-xml-files/generateBookXml");
const generatePageXml = require("../../components/activities/page-xml-files/generatePageXml");
const generateQuizInforefXml = require("../../components/activities/quiz-xml-files/generateQuizInforefXml");
const generateQuizXml = require("../../components/activities/quiz-xml-files/generateQuizXml");
const generateBoaInforefXml = require("../../components/activities/board-xml-files/generateBoaInforefXml");

// function to generate the appropriate XML files for a given activity-subdirectory type.
function createActivitiesfiles(activityType, dirPath) {
    if (activityType === 'book') {
      createBookXml(dirPath);
    } else if (activityType === 'page') {
      createPageXml(dirPath);
    } else if (activityType === 'quiz') {
      createQuizXml(dirPath);
    }
}

function createBookXml(activityInstancePath) {
    generateBookXml(activityInstancePath);
    generateCalendarXml(activityInstancePath);
    generateCompetenciesXml(activityInstancePath);
    generateFiltersXml(activityInstancePath);
    generateBookGradesXml(activityInstancePath);
    generateAssignGradeHistoryXml(activityInstancePath);;
    generateBoaInforefXml(activityInstancePath);
    generateModuleXml(activityInstancePath);
    generateAssignRolesXml(activityInstancePath);
}

function createPageXml(activityInstancePath) {
    generateCalendarXml(activityInstancePath);
    generateCompetenciesXml(activityInstancePath);
    generateFiltersXml(activityInstancePath);
    generateBoaGradesXml(activityInstancePath);
    generateAssignGradeHistoryXml(activityInstancePath);
    generateBoaInforefXml(activityInstancePath);
    generatePageXml(activityInstancePath);
    generateModuleXml(activityInstancePath);
    generateAssignRolesXml(activityInstancePath);
}

function createQuizXml(activityInstancePath) {
    generateCalendarXml(activityInstancePath);
    generateCompetenciesXml(activityInstancePath);
    generateFiltersXml(activityInstancePath);
    generateBookGradesXml(activityInstancePath);
    generateAssignGradeHistoryXml(activityInstancePath);
    generateQuizInforefXml(activityInstancePath);
    generateModuleXml(activityInstancePath);
    generateQuizXml(activityInstancePath);
    generateAssignRolesXml(activityInstancePath);
}

module.exports = createActivitiesfiles;