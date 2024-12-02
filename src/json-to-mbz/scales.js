const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates scales.xml file inside 'final-mbz' directory
// final-mbz\scales.xml
function createScalesXml(finalDir) {
    const scalesXml = xmlbuilder.create('scales_definition', { encoding: 'UTF-8' })
    .end({ pretty: true });
    fs.writeFileSync(path.join(finalDir, 'scales.xml'), scalesXml);

    return scalesXml;
}

module.exports = { createScalesXml };