const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateAssignXml(outputDir) {

    const assignXml = xmlbuilder.create('activity', { encoding: 'UTF-8' })
        .ele('assign', { id: '' , moduleid: '', modulename: 'assign', contextid: '' })
            .ele('name', '').up()
            .ele('intro', '').up()
            .ele('introformat', '').up()
            .ele('alwaysshowdescription', '').up()
            .ele('submissiondrafts', '').up()
            .ele('sendnotifications', '').up()
            .ele('sendlatenotifications', '').up()
            .ele('sendstudentnotifications', '').up()
            .ele('duedate', '').up()
            .ele('cutoffdate', '').up()
            .ele('gradingduedate', '').up()
            .ele('allowsubmissionsfromdate', '').up()
            .ele('grade', '').up()
            .ele('timemodified', '').up()
            .ele('requiresubmissionstatement', '').up()
            .ele('teamsubmission', '').up()
            .ele('requireallteammemberssubmit', '').up()
            .ele('teamsubmissiongroupingid', '').up()
            .ele('blindmarking', '').up()
            .ele('hidegrader', '').up()
            .ele('revealidentities', '').up()
            .ele('attemptreopenmethod', '').up()
            .ele('maxattempts', '').up()
            .ele('markingworkflow', '').up()
            .ele('markingallocation', '').up()
            .ele('preventsubmissionnotingroup', '').up()
            .ele('activity', '').up()
            .ele('activityformat', '').up()
            .ele('timelimit', '').up()
            .ele('submissionattachments', '').up()
            .ele('userflags', '').up()
            .ele('submissions', '').up()
            .ele('grades', '').up()
            .ele('plugin_configs')
                .ele('plugin_config')
                    .ele('plugin', '').up()
                    .ele('subtype', '').up()
                    .ele('name', '').up()
                    .ele('value', '').up()
                .up()
            .up()
            .ele('overrides', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'assign.xml'), assignXml);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    return assignXml;

}

module.exports = generateAssignXml;

