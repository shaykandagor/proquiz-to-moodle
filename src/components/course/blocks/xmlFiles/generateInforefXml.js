const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');


// Generates inforef.xml inside 'blocks' directory inside 'completion_progress'
// course\blocks\completion_progress\inforef.xml
function  generateInforefXml(completionProgressDir){
    const inforefXml = xmlbuilder.create('inforef', { encoding: 'UTF-8' })
    .end({ pretty: true });
    fs.writeFileSync(path.join(completionProgressDir, 'inforef.xml'), inforefXml);

    return inforefXml;
}

module.exports = { generateInforefXml }