const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateFoldInforefXml(outputDir) {
    const inforefXml = xmlbuilder.create('inforef', { encoding: 'UTF-8' })
        .ele('fileref',)
            .ele('file')
                .ele('id', '').up()
            .up()
        .up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'inforef.xml'), inforefXml);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    return inforefXml;
}

module.exports = generateFoldInforefXml;