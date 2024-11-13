const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates competencies.xml inside 'course'
// course\competencies.xml
const generateCompetenciesXml = (courseDir) => {
    const competenciesXml = xmlbuilder.create('course_competencies', { encoding: 'UTF-8' })
    .ele('competencies', '').up()
    .ele('user_competencies', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(courseDir, 'competencies.xml'), competenciesXml);

    return competenciesXml;
}

module.exports = { generateCompetenciesXml };