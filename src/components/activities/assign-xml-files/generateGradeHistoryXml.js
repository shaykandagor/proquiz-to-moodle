const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateGradeHistoryXml(outputDir) {

    const gradehistoryXml = xmlbuilder.create('grade_history', { encoding: 'UTF-8' })
        .ele('grade_grades', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'grade_history.xml'), gradehistoryXml);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    return gradehistoryXml;
}

module.exports = generateGradeHistoryXml;
