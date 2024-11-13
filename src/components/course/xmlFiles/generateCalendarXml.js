const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates calendar.xml inside 'course'
// course\calendar.xml
function generateCalendarXml(courseDir) {
    const calendarXml = xmlbuilder.create('events', { encoding: 'UTF-8' })
        .end({ pretty: true });
    fs.writeFileSync(path.join(courseDir, 'calendar.xml'), calendarXml);

    return calendarXml;
}

module.exports = { generateCalendarXml };
