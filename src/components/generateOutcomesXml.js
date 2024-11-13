const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates outcomes.xml file inside 'output' directory
// output\outcome.xml
function generateOutcomesXml(outputDir) {
    const outcomesXml = xmlbuilder.create('outcomes_definition', { encoding: 'UTF-8' })
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'outcomes.xml'), outcomesXml);

    return outcomesXml;
}

module.exports = generateOutcomesXml;