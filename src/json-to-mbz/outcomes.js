const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates outcomes.xml file inside 'final-mbz' directory
// final-mbz\outcomes.xml
function createOutcomesXml(finalDir) {
    const outcomesXml = xmlbuilder.create('outcomes_definition', { encoding: 'UTF-8' })
    .end({ pretty: true });
    fs.writeFileSync(path.join(finalDir, 'outcomes.xml'), outcomesXml);

    return outcomesXml;
}

module.exports = { createOutcomesXml };