const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateCompetenciesXml(outputDir) {
    const competenciesXml = xmlbuilder.create('course_module_competencies', { encoding: 'UTF-8' })
        .ele('competencies', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'competencies.xml'), competenciesXml);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    return competenciesXml;
}

module.exports = generateCompetenciesXml;