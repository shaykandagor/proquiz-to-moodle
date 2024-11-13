const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates questions.xml file inside 'output' directory
// output\questions.xml
function generateQuestionsXml(outputDir) {
    const questionsXml = xmlbuilder.create('question_categories', { encoding: 'UTF-8' })
        .ele('question_category', { id: '' })
            .ele('name', '').up()
            .ele('contextid', '').up()
            .ele('contextlevel', '').up()
            .ele('contextinstanceid', '').up()
            .ele('info', '').up()
            .ele('infoformat', '').up()
            .ele('stamp', '').up()
            .ele('parent', '').up()
            .ele('sortorder', '').up()
            .ele('idnumber', '').up()
            .ele('question_bank_entries', '').up()
        .end({ pretty: true });
        fs.writeFileSync(path.join(outputDir, 'questions.xml'), questionsXml);

    return questionsXml;
}

module.exports = generateQuestionsXml;

