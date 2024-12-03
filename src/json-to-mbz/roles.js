const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates roles.xml file inside 'final-mbz' directory
// final-mbz\roles.xml
function createRolesXml(finalDir) {
    const rolesXml = xmlbuilder.create('roles_definition', { encoding: 'UTF-8' })
    .ele('role', { id: '5' })
        .ele('name', '').up()
        .ele('shortname', 'student').up()
        .ele('nameincourse', '').up()
        .ele('description', '').up()
        .ele('sortorder', '5').up()
        .ele('archetype', 'student').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(finalDir, 'roles.xml'), rolesXml);

    return rolesXml;
}

module.exports = { createRolesXml };