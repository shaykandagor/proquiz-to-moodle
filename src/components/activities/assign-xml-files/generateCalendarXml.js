const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateCalendarXml(outputDir) {

    const calendarXml = xmlbuilder.create('events', { encoding: 'UTF-8' })
        .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'calendar.xml'), calendarXml);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    return calendarXml;
}

module.exports = generateCalendarXml;