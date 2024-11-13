const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates scales.xml file inside 'output' directory
// output\scales.xml
function generateScalesXml(outputDir) {
    const scalesXml = xmlbuilder.create('scales_definition', { encoding: 'UTF-8' })
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'scales.xml'), scalesXml);

    return scalesXml;
}

module.exports = generateScalesXml;