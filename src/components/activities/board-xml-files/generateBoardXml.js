const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateBoardXml(outputDir) {
    const boardXml = xmlbuilder.create('activity', { encoding: 'UTF-8' })
    .att({id: '', moduleid: '', modulename: 'board', contextid: ''})
    .ele('board', { id: '' })
        .ele('course', '').up()
        .ele('name', '').up()
        .ele('timemodified', '0').up()
        .ele('intro', '').up()
        .ele('introformat', '1').up()
        .ele('historyid', '0').up()
        .ele('background_color', '').up()
        .ele('addrating', '').up()
        .ele('hideheaders', '0').up()
        .ele('sortby', '').up()
        .ele('postby', '0').up()
        .ele('userscanedit', '0').up()
        .ele('singleusermode', '0').up()
        .ele('completionnotes', '0').up()
        .ele('columns')
            .ele('column', { id: '' })
                .ele('boardid', '').up()
                .ele('name', '').up()
                .ele('sortorder', '').up()
                .ele('notes').up()
            .up()
        .up()
    .up()
    .end({ pretty: true });

    fs.writeFileSync(path.join(outputDir, 'board.xml'), boardXml);

    return boardXml;
}

module.exports = generateBoardXml;