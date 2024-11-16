const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates contentbank.xml inside 'course'
// course\contentbank.xml
function generateContentbankXml(courseDir) {
    const contentbankXml = xmlbuilder.create('contents', { encoding: 'UTF-8' })
    .end({ pretty: true });
    fs.writeFileSync(path.join(courseDir, 'contentbank.xml'), contentbankXml);

    return contentbankXml;

}

module.exports = { generateContentbankXml };