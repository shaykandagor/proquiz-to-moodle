const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateAttCalendarXml(outputDir) {

    const calendarXml = xmlbuilder.create('events', { encoding: 'UTF-8' })
        .ele('event', { id: '69058' })
            .ele('name', 'Läsnäolo tilastointia varten (luennoilla ei läsnäolo pakkoa) (Ryhmä TXQ22ICT)').up()
            .ele('description', 'Normaali kontaktiopetus').up()
            .ele('format', '1').up()
            .ele('courseid', '4415').up()
            .ele('groupid', '12784').up()
            .ele('userid', '23').up()
            .ele('repeatid', '0').up()
            .ele('modulename', 'attendance').up()
            .ele('instance', '283').up()
            .ele('type', '0').up()
            .ele('eventtype', 'attendance').up()
            .ele('timestart', '1705561200').up()
            .ele('timeduration', '10800').up()
            .ele('timesort', '$@NULL@$').up()
            .ele('visible', '1').up()
            .ele('uuid', '').up()
            .ele('sequence', '1').up()
            .ele('timemodified', '1716882650').up()
            .ele('priority', '$@NULL@$').up()
            .ele('location', '$@NULL@$').up()
        .up()
        .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'calendar.xml'), calendarXml);

    return calendarXml;
}

module.exports = generateAttCalendarXml;