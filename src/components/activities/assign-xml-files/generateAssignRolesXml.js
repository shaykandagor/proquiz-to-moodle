const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateAssignRolesXml(outputDir) {
    const roleXml = xmlbuilder.create('roles', { encoding: 'UTF-8' })
        .ele('role_overrides', '').up()
        .ele('role_assignments', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'roles.xml'), roleXml);

    
    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    return roleXml;
}

module.exports = generateAssignRolesXml;
