const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

function generateBlockXml(completionProgressDir) {
    // Ensure the directory exists
    if (!fs.existsSync(completionProgressDir)) {
        fs.mkdirSync(completionProgressDir, { recursive: true });
    }

    const blockXml = xmlbuilder.create('block', { encoding: 'UTF-8' })
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

module.exports = { generateBlockXml };