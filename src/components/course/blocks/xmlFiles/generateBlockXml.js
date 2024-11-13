const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates block.xml inside 'blocks' directory inside 'completion_progress' folder
// course\blocks\completion_progress\block.xml
function generateBlockXml(completionProgressDir){
    const blockXml = xmlbuilder.create('block', { encoding: 'UTF-8' })
    .att( 'id', '' ).att('contextid', '').att('version', '')
        .ele('blockname', '').up()
        .ele('parentcontextid', '').up()
        .ele('showinsubcontexts', '').up()
        .ele('pagetypepattern', '').up()
        .ele('subpagepattern', '').up()
        .ele('defaultregion', '').up()
        .ele('defaultweight', '').up()
        .ele('configdata', '').up()
        .ele('timecreated', '').up()
        .ele('timemodified', '').up()
        .ele('block_positions', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(completionProgressDir, 'block.xml'), blockXml);

    return blockXml;
}

module.exports = { generateBlockXml }