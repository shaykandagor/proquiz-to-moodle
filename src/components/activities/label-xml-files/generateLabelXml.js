const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateLabelXml(outputDir) {
    const labelXml = xmlbuilder.create('activity', { encoding: 'UTF-8' })
        .att({
            id: '',
            moduleid: '',
            modulename: 'label',
            contextid: ''
        })
        .ele('label', { id: '' })
            .ele('name', '').up()
            .ele('intro', '').up()
            .ele('introformat', '').up()
            .ele('timemodified', '').up()
        .up()
        .end({ pretty: true });

    fs.writeFileSync(path.join(outputDir, 'label.xml'), labelXml);

    return labelXml;
}

module.exports = generateLabelXml;