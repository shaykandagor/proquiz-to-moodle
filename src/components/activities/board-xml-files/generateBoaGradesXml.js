const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateBoaGradesXml(outputDir) {

    const gradesXml = xmlbuilder.create('activity_gradebook', { encoding: 'UTF-8' })
        .ele('grade_items').up()
        .ele('grade_letters').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'grades.xml'), gradesXml);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    return gradesXml;
}

module.exports = generateBoaGradesXml;