const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates roles.xml file inside 'output' directory
// output\roles.xml
function generateMainRolesXml(outputDir) {
    const rolesXml = xmlbuilder.create('roles_definition', { encoding: 'UTF-8' })
    .ele('role')
        .att('id', '5')
        .ele('name', '').up()
        .ele('shortname', 'student').up()
        .ele('nameincourse', '').up()
        .ele('description', '').up()
        .ele('sortorder', '5').up()
        .ele('archetype', 'student').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'roles.xml'), rolesXml);

    return rolesXml;
}

module.exports = generateMainRolesXml;