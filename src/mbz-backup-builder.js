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
const generateActivitiesFolders = require("./components/activities/generateActivitiesFolders");


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
    const htmlDir = path.join(blocksDir, 'html');
    const analyticsGraphsDir = path.join(blocksDir, 'analytics_graphs');
    const sectionsDir = path.join(outputDir, 'sections');
    const sectionDir = path.join(sectionsDir, 'section');

    const activitiesDir = path.join(outputDir, 'activities');

    // Create subdirectories inside 'activities'
    generateActivitiesFolders(activitiesDir);

    // Create xml files
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

    /* 
    const gradehistoryXml = xmlbuilder.create('grade_history', { encoding: 'UTF-8' })
        .ele('grade_grades', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'grade_history.xml'), gradehistoryXml);

    

    // Create calendar.xml inside 'course'
    const calendarXml = xmlbuilder.create('events', { encoding: 'UTF-8' })
        .end({ pretty: true });
    fs.writeFileSync(path.join(courseDir, 'calendar.xml'), calendarXml);

    // Create competencies.xml inside 'course'
    const competenciesXml = xmlbuilder.create('course_competencies', { encoding: 'UTF-8' })
        .ele('competencies', '').up()
        .ele('user_competencies', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(courseDir, 'competencies.xml'), competenciesXml); 


    // Create filters.xml inside 'course'
    const filtersXml = xmlbuilder.create('filters', { encoding: 'UTF-8' })
        .ele('filter_actives', '').up()
        .ele('filters_config', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(courseDir, 'filters.xml'), filtersXml);

    // Create inforef.xml inside 'course'
    const inforefXml = xmlbuilder.create('inforef', { encoding: 'UTF-8' })
        .ele('groupref')
            .ele('group',)
                .ele('id', '').up()
            .up()
        .up()
        .ele('roleref')
            .ele('role')
                .ele('id', '').up()
            .up()
        .up()
        .ele('question_categoryref')
            .ele('question_category')
                .ele('id', '').up()
            .up()
        .up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(courseDir, 'inforef.xml'), inforefXml);

    // Create roles.xml inside 'course'
    const roleXml = xmlbuilder.create('roles', { encoding: 'UTF-8' })
        .ele('role_overrides', '').up()
        .ele('role_assignments', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(courseDir, 'roles.xml'), roleXml); 


     // Create inforef.xml inside 'blocks' directory inside 'completion_progress'
    const cpInforefXml = xmlbuilder.create('inforef', { encoding: 'UTF-8' })
    .end({ pretty: true });
    fs.writeFileSync(path.join(completionProgressDir, 'inforef.xml'), cpInforefXml);

     // Create roles.xml inside 'blocks' directory inside 'completion_progress'
    const cpRoleXml = xmlbuilder.create('roles', { encoding: 'UTF-8' })
        .ele('role_overrides', '').up()
        .ele('role_assignments', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(completionProgressDir, 'roles.xml'), cpRoleXml);


     // Create inforef.xml inside 'blocks' directory inside 'html'
    const htmlInforefXml = xmlbuilder.create('inforef', { encoding: 'UTF-8' })
    .end({ pretty: true });
    fs.writeFileSync(path.join(htmlDir, 'inforef.xml'), htmlInforefXml);

     */
}




createMoodleBackup("output/mbz");
