const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates inforef.xml inside 'course'
// course\inforef.xml
function generateInforefXml(courseDir) {
    const inforefXml = xmlbuilder.create('inforef', { encoding: 'UTF-8' })
        .ele('roleref')
            .ele('role')
                .ele('id', '5').up()
            .up()
        .up()
        .end({ pretty: true });

    fs.writeFileSync(path.join(courseDir, 'inforef.xml'), inforefXml);

    return inforefXml;
}

module.exports = { generateInforefXml };