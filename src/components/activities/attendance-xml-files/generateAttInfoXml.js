const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateAttInforefXml(outputDir) {
    const inforefXml = xmlbuilder.create('inforef', { encoding: 'UTF-8' })
        .ele('userref')
            .ele('user')
                .ele('id', '').up()
            .up()
        .up()
        .ele('groupref')
            .ele('group')  
                .ele('id', '').up()
            .up()
        .up()
        .ele('grade_itemref')
            .ele('grade_item')
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

module.exports = generateAttInforefXml;