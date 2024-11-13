const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateResourceXml(outputDir) {
    const resourceXml = xmlbuilder.create('activity', { encoding: 'UTF-8' })
        .att({
            id: '',
            moduleid: '',
            modulename: 'resource',
            contextid: ''
        })
        .ele('resource', { id: '' })
            .ele('name', '').up()
            .ele('intro', '').up()
            .ele('introformat', '1').up()
            .ele('tobemigrated', '0').up()
            .ele('legacyfiles', '0').up()
            .ele('legacyfileslast', '$@NULL@$').up()
            .ele('display', '0').up()
            .ele('displayoptions', 'a:1:{s:10:"printintro";i:1;}').up()
            .ele('filterfiles', '0').up()
            .ele('revision', '1').up()
            .ele('timemodified', '').up()
        .up()
        .end({ pretty: true });

    fs.writeFileSync(path.join(outputDir, 'resource.xml'), resourceXml);

    return resourceXml;
}

module.exports = generateResourceXml;