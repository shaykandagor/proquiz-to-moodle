const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateUrlXml(outputDir) {
    const urlXml = xmlbuilder.create('activity', { encoding: 'UTF-8' })
        .att({
            id: '',
            moduleid: '',
            modulename: 'url',
            contextid: ''
        })
        .ele('url', { id: '' })
            .ele('name', '').up()
            .ele('intro', '').up()
            .ele('introformat', '1').up()
            .ele('externalurl', 'https://www.youtube.com/playlist?list=PLycfzWKAP8Z77roVbEfIu7mRM8MXM9KTH').up()
            .ele('display', '5').up()
            .ele('displayoptions', 'a:0:{}').up()
            .ele('parameters', 'a:0:{}').up()
            .ele('timemodified', '').up()
        .up()
        .end({ pretty: true });

    fs.writeFileSync(path.join(outputDir, 'url.xml'), urlXml);

    return urlXml;
}

module.exports = generateUrlXml;