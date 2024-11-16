const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generatePageXml(outputDir) {
    const pageXml = xmlbuilder.create('activity', { encoding: 'UTF-8' })
        .att({
            id: '',
            moduleid: '',
            modulename: 'page',
            contextid: ''
        })
        .ele('page', { id: '' })
            .ele('name', '').up()
            .ele('intro', '').up()
            .ele('introformat', '').up()
            .ele('content', '').up()
            .ele('contentformat', '').up()
            .ele('legacyfiles', '0').up()
            .ele('legacyfileslast', '$@NULL@$').up()
            .ele('display', '5').up()
            .ele('displayoptions', 'a:2:{s:10:"printintro";s:1:"0";s:17:"printlastmodified";s:1:"1";}').up()
            .ele('revision', '5').up()
            .ele('timemodified', '').up()
        .up()
        .end({ pretty: true });

    fs.writeFileSync(path.join(outputDir, 'page.xml'), pageXml);

    return pageXml;
}

module.exports = generatePageXml;