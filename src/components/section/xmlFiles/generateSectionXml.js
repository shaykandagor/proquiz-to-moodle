const fs = require("fs");
const path = require("path");
const xmlbuilder = require("xmlbuilder");

// Generates section.xml inside 'sections' directory inside 'section'
// sections\section\section.xml
function generateSectionXml(sectionDir){
    const sectionXml = xmlbuilder.create('section', { encoding: 'UTF-8' })
    .att('id', '')
    .ele('number', '').up()
    .ele('name', '').up()
    .ele('summary', '').up()
    .ele('summaryformat', '').up()
    .ele('sequence', '').up()
    .ele('visible', '').up()
    .ele('availabilityjson', '').up()
    .ele('timemodified', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(sectionDir, 'section.xml'), sectionXml);

    return sectionXml;
}

module.exports = { generateSectionXml }



