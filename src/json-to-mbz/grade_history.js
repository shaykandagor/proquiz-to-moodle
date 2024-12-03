const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates grade_history.xml file inside 'final-mbz' directory
// final-mbz\grade_history.xml
function createGradehistoryXml(finalDir) {
    const gradehistoryXml = xmlbuilder.create('grade_history', { encoding: 'UTF-8' })
    .ele('grade_grades', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(finalDir, 'grade_history.xml'), gradehistoryXml);

    return gradehistoryXml;
}

module.exports = { createGradehistoryXml };
