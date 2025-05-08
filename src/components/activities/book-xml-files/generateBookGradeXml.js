const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateBookGradesXml(outputDir) {

    const gradesXml = xmlbuilder.create('activity_gradebook', { encoding: 'UTF-8' })
        .ele('grade_items')
        .ele('grade_letters')
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'grades.xml'), gradesXml);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    return gradesXml;
}

module.exports = generateBookGradesXml;