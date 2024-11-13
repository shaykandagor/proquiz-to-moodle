const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates roles.xml file inside 'output' directory
// output\roles.xml
function generateRolesXml(outputDir) {
    const rolesXml = xmlbuilder.create('roles_definition', { encoding: 'UTF-8' })
    .ele('role', { id: '' })
        .ele('name', '').up()
        .ele('shortname', '').up()
        .ele('nameincourse', '').up()
        .ele('description', '').up()
        .ele('sortorder', '').up()
        .ele('archetype', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'roles.xml'), rolesXml);

    return rolesXml;
}

module.exports = generateRolesXml;