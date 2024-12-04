const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates files.xml file inside 'output' directory
// output\files.xml
function generateFilesXml(outputDir) {
    const fileXml = xmlbuilder.create('files', { encoding: 'UTF-8' })
        .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'files.xml'), fileXml);

    return fileXml;
}

module.exports = generateFilesXml;