const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates groups.xml file inside 'output' directory
// output\groups.xml
function generateGroupsXml(outputDir) {
    const groupsXml = xmlbuilder.create('groups', { encoding: 'UTF-8' })
        .ele('groupings').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'groups.xml'), groupsXml);

    return groupsXml;
}

module.exports = generateGroupsXml