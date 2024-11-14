const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateChatXml(outputDir) {
    const chatXml = xmlbuilder.create('activity', { encoding: 'UTF-8' })
        .att({id: '', moduleid: '', modulename: 'chat', contextid: ''})
        .ele('chat', { id: '332' })
            .ele('name', '').up()
            .ele('intro', '').up()
            .ele('introformat', '').up()
            .ele('keepdays', '').up()
            .ele('studentlogs', '').up()
            .ele('chattime', '').up()
            .ele('schedule', '').up()
            .ele('timemodified', '').up()
            .ele('messages').up()
        .up()
        .end({ pretty: true });

    fs.writeFileSync(path.join(outputDir, 'chat.xml'), chatXml);

    return chatXml;
}

module.exports = generateChatXml;