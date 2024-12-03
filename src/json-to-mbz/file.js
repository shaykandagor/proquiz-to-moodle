const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates files.xml file inside 'final-mbz' directory
// final-mbz\files.xml
function createFileXml(finalDir) {
    const fileXml = xmlbuilder.create('files', { encoding: 'UTF-8' })
        .end({ pretty: true });
    fs.writeFileSync(path.join(finalDir, 'files.xml'), fileXml);

    return fileXml;
}

module.exports = { createFileXml };