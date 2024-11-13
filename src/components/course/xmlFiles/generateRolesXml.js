const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates roles.xml inside 'course'
// course\roles.xml
function generateRolesXml(courseDir) {
const roleXml = xmlbuilder.create('roles', { encoding: 'UTF-8' })
 .ele('role_overrides', '').up()
 .ele('role_assignments', '').up()
.end({ pretty: true });
fs.writeFileSync(path.join(courseDir, 'roles.xml'), roleXml);

return roleXml;
}

module.exports = { generateRolesXml };