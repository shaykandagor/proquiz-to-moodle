const fs = require('fs');
const path = require('path');
const { title } = require('process');
const xmlbuilder = require('xmlbuilder');

function createMoodleBackup(outputDir) {
    // Create subdirectories
    const backupDirs = [
        'activities',
        'course',
        'files',
        'sections'
    ];

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Create subdirectories
    backupDirs.forEach(dir => {
        const dirPath = path.join(outputDir, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    });

    // Create directories and files inside the 'course' directory
    const courseDir = path.join(outputDir, 'course');
    const courseSubDirs = ['blocks'];
    const courseFiles = ['course.xml', 'calendar.xml', 'competencies.xml', 'completiondefaults.xml', 'contentbank.xml', 'enrolments.xml', 'filters.xml', 'inforef.xml', 'roles.xml'];

    // Create subdirectories inside 'course'
    courseSubDirs.forEach(subDir => {
        const subDirPath = path.join(courseDir, subDir);
        if (!fs.existsSync(subDirPath)) {
            fs.mkdirSync(subDirPath, { recursive: true });
        }
    });

    // Create directories and files inside the 'blocks' directory within 'course'
    const courseBlockDir = path.join(courseDir, 'blocks');
    const blockSubDirs = ['analytics_graphs', 'html', 'completion_progress'];

    // Create subdirectories inside 'blocks'
    blockSubDirs.forEach(subDir => {
        const subDirPath = path.join(courseBlockDir, subDir);
        if (!fs.existsSync(subDirPath)) {
            fs.mkdirSync(subDirPath, { recursive: true });
        }
    });

    
    const backupXml = xmlbuilder.create('moodle_backup', { encoding: 'UTF-8' })
        .ele('information')
            .ele('name', 'backup-moodle2-course-5014-insmat_s24-20241030-0912-nu.mbz').up()
            .ele('moodle_version', '2022112813').up()
            .ele('moodle_release', '4.1.13 (Build: 20240902)').up()
            .ele('backup_version', '2022112800').up()
            .ele('backup_release', '4.1').up()
            .ele('backup_date', Math.floor(Date.now() / 1000)).up()
            .ele('mnet_remoteusers', '0').up()
            .ele('include_files', '1').up()
            .ele('include_file_references_to_external_content', '0').up()
            .ele('original_wwwroot', 'https://moodle.metropolia.com').up()
            .ele('original_site_identifier_hash', 'ddc026eaa3a68b0dc3bf0f757a1ba639').up()
            .ele('original_course_id', '5014').up()
            .ele('original_course_format', 'topics').up()
            .ele('original_course_fullname', 'Example Course Fullname').up()
            .ele('original_course_shortname', 'Example_Shortname').up()
            .ele('original_course_startdate', '1724014800').up()
            .ele('original_course_enddate', '1734127200').up()
            .ele('original_course_contextid', '1136474').up()
            .ele('original_system_contextid', '1').up()
        .up()
        .ele('details')
            .ele('detail', { backup_id: '0c88da734a87fe7c804221b9edd28a13' })
                .ele('type', 'course').up()
                .ele('format', 'moodle2').up()
                .ele('interactive', '1').up()
                .ele('mode', '10').up()
                .ele('execution', '1').up()
                .ele('executiontime', '0').up()
            .up()
        .up()
        .ele('contents')
            .ele('activities')
                .ele('activity')
                    .ele('moduleid', '410107').up()
                    .ele('sectionid', '58941').up()
                    .ele('modulename', 'resource').up()
                    .ele('title', 'Kurssi-info LUE TÄMÄ!!!').up()
                    .ele('directory', 'activities/resource_410107').up()
                .up()
            .up()
            .ele('sections')
                .ele('section')
                    .ele('sectionid', '58941').up()
                    .ele('title', '0').up()
                    .ele('directory', 'sections/section_58941').up()
                .up()
            .up()
            .ele('course')
                .ele('courseid', '5014').up()
                .ele('title', 'Example Course Fullname').up()
                .ele('directory', 'course').up()
                .up()
            .up()
            .ele('settings')
                .ele('setting')
                    .ele('level', "root").up()
                    .ele('name', 'filename').up()
                    .ele('value', 'backup-moodle2-course-5014-insmat_s24-20241030-0912-nu.mbz').up()
                .up()
            .up()
        .end({ pretty: true });

    fs.writeFileSync(path.join(outputDir, 'moodle_backup.xml'), backupXml);

    const fileXml = xmlbuilder.create('files', { encoding: 'UTF-8' })
         .ele('file',  { id: '' })
            .ele('contenthash', '').up()
            .ele('contextid', '').up()
            .ele('component', '').up()
            .ele('filearea', '').up()
            .ele('itemid', '').up()
            .ele('filepath', '').up()
            .ele('filename', '').up()
            .ele('userid', '').up()
            .ele('filesize', '').up()
            .ele('mimetype', '').up()
            .ele('status', '').up()
            .ele('timecreated', '').up()
            .ele('timemodified', '').up()
            .ele('source', '').up()
            .ele('author', '').up()
            .ele('license', '').up()
            .ele('sortorder', '').up()
            .ele('repositorytype', '').up()
            .ele('repositoryid', '').up()
            .ele('reference', '').up()
        .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'files.xml'), fileXml);

    const gradebookXml = xmlbuilder.create('gradebook', { encoding: 'UTF-8' })
        .ele('attributes').up()
        .ele('grade_categories')
            .ele('grade_category', { id: '' })
                .ele('parent', '').up()
                .ele('depth', '').up()
                .ele('path', '').up()
                .ele('fullname', '').up()
                .ele('aggregation', '').up()
                .ele('keephigh', '').up()
                .ele('droplow', '').up()
                .ele('aggregateonlygraded', '').up()
                .ele('aggregateoutcomes', '').up()
                .ele('timecreated', '').up()
                .ele('timemodified', '').up()
                .ele('hidden', '').up()
            .up()
        .up()
        .ele('grade_items')
            .ele('grade_item', { id: '' })
                .ele('categoryid', '').up()
                .ele('itemname', '').up()
                .ele('itemtype', '').up()
                .ele('itemmodule', '').up()
                .ele('iteminstance', '').up()
                .ele('itemnumber', '').up()
                .ele('iteminfo', '').up()
                .ele('idnumber', '').up()
                .ele('calculation', '').up()
                .ele('gradetype', '').up()
                .ele('grademax', '').up()
                .ele('grademin', '').up()
                .ele('scaleid', '').up()
                .ele('outcomeid', '').up()
                .ele('gradepass', '').up()
                .ele('multfactor', '').up()
                .ele('plusfactor', '').up()
                .ele('aggregationcoef', '').up()
                .ele('aggregationcoef2', '').up()
                .ele('weightoverride', '').up()
                .ele('sortorder', '').up()
                .ele('display', '').up()
                .ele('decimals', '').up()
                .ele('hidden', '').up()
                .ele('locked', '').up()
                .ele('locktime', '').up()
                .ele('needsupdate', '').up()
                .ele('timecreated', '').up()
                .ele('timemodified', '').up()
                .ele('grade_grades', '').up()
            .up()
        .up()
        .ele('grade_letters')
            .ele('grade_letter', { id: '' })
                .ele('lowerboundary', '').up()
                .ele('letter', '').up()
            .up()
        .up()
        .ele('grade_settings')
            .ele('grade_setting', { id: '' })
                .ele('name', '').up()
                .ele('value', '').up()
            .up()
        .up()
        .end({ pretty: true });

    fs.writeFileSync(path.join(outputDir, 'gradebook.xml'), gradebookXml);

    const gradehistoryXml = xmlbuilder.create('grade_history', { encoding: 'UTF-8' })
        .ele('grade_grades', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'grade_history.xml'), gradehistoryXml);

    const groupsXml = xmlbuilder.create('groups', { encoding: 'UTF-8' })
        .ele('group', { id: '' })
            .ele('name', '').up()
            .ele('idnumber', '').up()
            .ele('description', '').up()
            .ele('descriptionformat', '').up()
            .ele('enrolmentkey', '').up()
            .ele('picture', '').up()
            .ele('hidepicture', '').up()
            .ele('timecreated', '').up()
            .ele('timemodified', '').up()
            .ele('group_members', '').up()
        .up()
            .ele('groupings')
                .ele('grouping', { id: '' })
                    .ele('name', '').up()
                    .ele('idnumber', '').up()
                    .ele('description', '').up()
                    .ele('descriptionformat', '').up()
                    .ele('configdata', '').up()
                    .ele('timecreated', '').up()
                    .ele('timemodified', '').up()
                    .ele('grouping_groups', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'groups.xml'), groupsXml);

    const completionXml = xmlbuilder.create('course_completion', { encoding: 'UTF-8' })
        .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'completion.xml'), completionXml);


   // Create files inside 'course'
   courseFiles.forEach(file => {
    const filePath = path.join(courseDir, file);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, 'This is a sample file content.');
    }
    });

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

    // Create completiondefaults.xml inside 'course'
    const completiondefaultsXml = xmlbuilder.create('course_completion_defaults', { encoding: 'UTF-8' })
        .end({ pretty: true });
    fs.writeFileSync(path.join(courseDir, 'completiondefaults.xml'), completiondefaultsXml);

    // Create contentbank.xml inside 'course'
    const contentbankXml = xmlbuilder.create('contents', { encoding: 'UTF-8' })
        .end({ pretty: true });
    fs.writeFileSync(path.join(courseDir, 'contentbank.xml'), contentbankXml);

      // Create course.xml inside 'course'
      const courseXml = xmlbuilder.create('course', { encoding: 'UTF-8' })
      .att('id', '').att('contextid', '')
      .ele('shortname', '').up()
      .ele('fullname', '').up()
      .ele('idnumber', '').up()
      .ele('summary', '').up()
      .ele('summaryformat', '').up()
      .ele('format', '').up()
      .ele('showgrades', '').up()
      .ele('newsitems', '').up()
      .ele('startdate', '').up()
      .ele('enddate', '').up()
      .ele('marker', '').up()
      .ele('maxbytes', '').up()
      .ele('legacyfiles', '').up()
      .ele('showreports', '').up()
      .ele('visible', '').up()
      .ele('groupmode', '').up()
      .ele('groupmodeforce', '').up()
      .ele('defaultgroupingid', '').up()
      .ele('lang', '').up()
      .ele('theme', '').up()
      .ele('timecreated', '').up()
      .ele('timemodified', '').up()
      .ele('requested', '').up()
      .ele('enablecompletion', '').up()
      .ele('completionnotify', '').up()
      .ele('numsections', '').up()
      .ele('hiddensections', '').up()
      .ele('coursedisplay', '').up()
      .ele('imagecontaineralignment', '').up()
      .ele('imagecontainerwidth', '').up()
      .ele('imagecontainerratio', '').up()
      .ele('imagesizemethod', '').up()
      .ele('bordercolour', '').up()
      .ele('borderwidth', '').up()
      .ele('borderradius', '').up()
      .ele('imagecontainerbackgroundcolour', '').up()
      .ele('currentselectedsectioncolour', '').up()
      .ele('currentselectedimagecontainertextcolour', '').up()
      .ele('currentselectedimagecontainercolour', '').up()
      .ele('hidesectiontitle', '').up()
      .ele('sectiontitlegridlengthmaxoption', '').up()
      .ele('sectiontitleboxposition', '').up()
      .ele('sectiontitleboxinsideposition', '').up()
      .ele('sectiontitleboxheight', '').up()
      .ele('sectiontitleboxopacity', '').up()
      .ele('sectiontitlefontsize', '').up()
      .ele('sectiontitlealignment', '').up()
      .ele('sectiontitleinsidetitletextcolour', '').up()
      .ele('sectiontitleinsidetitlebackgroundcolour', '').up()
      .ele('showsectiontitlesummary', '').up()
      .ele('setshowsectiontitlesummaryposition', '').up()
      .ele('sectiontitlesummarymaxlength', '').up()
      .ele('sectiontitlesummarytextcolour', '').up()
      .ele('sectiontitlesummarybackgroundcolour', '').up()
      .ele('sectiontitlesummarybackgroundopacity', '').up()
      .ele('newactivity', '').up()
      .ele('singlepagesummaryimage', '').up()
      .ele('fitsectioncontainertowindow', '').up()
      .ele('greyouthidden', '').up()
      .ele('setsection0ownpagenogridonesection', '').up()
      .ele('plugin_format_grid_course')
          .ele('showsummary', '').up()
      .up()
      .ele('category', { id: '' })
          .ele('name', '').up()
          .ele('desciption', '').up()
      .up()
      .ele('tags', '').up()
      .ele('customfields', '').up()
      .ele('courseformatoptions')
          .ele('customformatoption')
              .ele('format', '').up()
              .ele('sectionid', '').up()
              .ele('name', '').up()
              .ele('value', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(courseDir, 'course.xml'), courseXml);

    // Create enrolments.xml inside 'course'
    const enrolmentsXml = xmlbuilder.create('enrolments', { encoding: 'UTF-8' })
        .ele('enrols')
            .ele('enrol', { id: '' })
                .ele('enrol', '').up()
                .ele('status', '').up()
                .ele('name', '').up()
                .ele('enrolperiod', '').up()
                .ele('enrolstartdate', '').up()
                .ele('enrolenddate', '').up()
                .ele('expirynotify', '').up()
                .ele('expirythreshold', '').up()
                .ele('notifyall', '').up()
                .ele('password', '').up()
                .ele('cost', '').up()
                .ele('currency', '').up()
                .ele('roleid', '').up()
                .ele('customint1', '').up()
                .ele('customint2', '').up()
                .ele('customint3', '').up()
                .ele('customint4', '').up()
                .ele('customint5', '').up()
                .ele('customint6', '').up()
                .ele('customint7', '').up()
                .ele('customint8', '').up()
                .ele('customchar1', '').up()
                .ele('customchar2', '').up()
                .ele('customchar3', '').up()
                .ele('customdec1', '').up()
                .ele('customdec2', '').up()
                .ele('customtext1', '').up()
                .ele('customtext2', '').up()
                .ele('customtext3', '').up()
                .ele('customtext4', '').up()
                .ele('timecreated', '').up()
                .ele('timemodified', '').up()
                .ele('user_enrolments', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(courseDir, 'enrolments.xml'), enrolmentsXml);

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

}

// Example usage:
createMoodleBackup('output/mbz');
