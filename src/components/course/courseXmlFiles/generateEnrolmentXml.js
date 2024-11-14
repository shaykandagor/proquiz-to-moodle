const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates enrolments.xml inside 'course'
// course\enrolments.xml
function generateEnrolmentXml(courseDir) {
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

    return enrolmentsXml;
}

module.exports = { generateEnrolmentXml };