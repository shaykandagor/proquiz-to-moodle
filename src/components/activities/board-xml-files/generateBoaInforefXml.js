const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateBoaInforefXml(outputDir) {
    const inforefXml = xmlbuilder.create('inforef', { encoding: 'UTF-8' })
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'inforef.xml'), inforefXml);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    return inforefXml;
}

module.exports = generateBoaInforefXml;