const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');


// Generates roles.xml inside 'blocks' directory inside 'completion_progress'
// course\blocks\completion_progress\roles.xml
function generateRolesXml(completionProgressDir){

    // Ensure the directory exists
    if (!fs.existsSync(completionProgressDir)) {
        fs.mkdirSync(completionProgressDir, { recursive: true });
    }
    
    const roleXml = xmlbuilder.create('roles', { encoding: 'UTF-8' })
    .ele('role_overrides', '').up()
    .ele('role_assignments', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(completionProgressDir, 'roles.xml'), roleXml);

    return roleXml;
}

module.exports = { generateRolesXml }