const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates groups.xml file inside 'final-mbz' directory
// final-mbz\groups.xml
function createGroupsXml(finalDir) {
    const groupsXml = xmlbuilder.create('groups', { encoding: 'UTF-8' })
        .ele('groupings').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(finalDir, 'groups.xml'), groupsXml);

    return groupsXml;
}

module.exports = { createGroupsXml }