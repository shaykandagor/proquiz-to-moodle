const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateGradingXml(outputDir) {
    const gradingXml = xmlbuilder.create('areas', { encoding: 'UTF-8' })
    .ele('area', { id: '' })
        .ele('areaname', 'Grading').up()
        .ele('activemethod', '').up()
        .ele('definitions', '').up()
        .up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'grading.xml'), gradingXml);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    return gradingXml;
}

module.exports = generateGradingXml;