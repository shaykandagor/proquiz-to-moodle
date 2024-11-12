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

    const outcomesXml = xmlbuilder.create('outcomes_definition', { encoding: 'UTF-8' })
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'outcomes.xml'), outcomesXml);

    const scalesXml = xmlbuilder.create('scales_definition', { encoding: 'UTF-8' })
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'scales.xml'), scalesXml);

    const rolesXml = xmlbuilder.create('roles_definition', { encoding: 'UTF-8' })
    .ele('role', { id: '' })
        .ele('name', '').up()
        .ele('shortname', '').up()
        .ele('nameincourse', '').up()
        .ele('description', '').up()
        .ele('sortorder', '').up()
        .ele('archetype', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'roles.xml'), rolesXml);

    const questionsXml = xmlbuilder.create('question_categories', { encoding: 'UTF-8' })
    .ele('question_category', { id: '' })
        .ele('name', '').up()
        .ele('contextid', '').up()
        .ele('contextlevel', '').up()
        .ele('contextinstanceid', '').up()
        .ele('info', '').up()
        .ele('infoformat', '').up()
        .ele('stamp', '').up()
        .ele('parent', '').up()
        .ele('sortorder', '').up()
        .ele('idnumber', '').up()
        .ele('question_bank_entries', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'questions.xml'), questionsXml);

}

// Example usage:
createMoodleBackup('output/mbz');
