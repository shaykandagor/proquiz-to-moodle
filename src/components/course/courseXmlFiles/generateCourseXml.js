const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates course.xml inside 'course'
// course\course.xml
function generateCourseXml(outputDir) {
    const courseXml = xmlbuilder.create('course', { encoding: 'UTF-8' })
        .att('id', '')
        .att('contextid', '')
        .ele('shortname', '').up()
        .ele('fullname', '').up()
        .ele('idnumber', '').up()
        .ele('summary', '').up()
        .ele('summaryformat', '1').up()
        .ele('format', 'topics').up()
        .ele('showgrades', '1').up()
        .ele('newsitems', '0').up()
        .ele('startdate', '').up()
        .ele('enddate', '').up()
        .ele('marker', '0').up()
        .ele('maxbytes', '52428800').up()
        .ele('legacyfiles', '0').up()
        .ele('showreports', '0').up()
        .ele('visible', '0').up()
        .ele('groupmode', '0').up()
        .ele('groupmodeforce', '0').up()
        .ele('defaultgroupingid', '0').up()
        .ele('lang', '').up()
        .ele('theme', '').up()
        .ele('timecreated', '').up()
        .ele('timemodified', '').up()
        .ele('requested', '0').up()
        .ele('showactivitydates', '1').up()
        .ele('showcompletionconditions', '1').up()
        .ele('enablecompletion', '1').up()
        .ele('completionnotify', '0').up()
        .ele('category', { id: '11' })
            .ele('name', 'ICT ja tuotantotalous').up()
            .ele('description', '').up()
        .up()
        .ele('tags').up()
        .ele('customfields').up()
        .ele('courseformatoptions')
            .ele('courseformatoption')
                .ele('format', 'topics').up()
                .ele('sectionid', '0').up()
                .ele('name', 'hiddensections').up()
                .ele('value', '1').up()
            .up()
            .ele('courseformatoption')
                .ele('format', 'topics').up()
                .ele('sectionid', '0').up()
                .ele('name', 'coursedisplay').up()
                .ele('value', '0').up()
            .up()
        .up()
        .end({ pretty: true });

    fs.writeFileSync(path.join(outputDir, 'course.xml'), courseXml);

    return courseXml;
}

module.exports = generateCourseXml;