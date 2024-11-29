const fs = require("fs");
const path = require("path");
const xmlbuilder = require("xmlbuilder");

// function to generate the section.xml file
function generateSectionXml(outputDir) {

    // Ensure the directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const sectionXml = xmlbuilder.create('section', { encoding: 'UTF-8' })
        .att('id', "")
        .ele('number', '').up()
        .ele('name', '').up()
        .ele('summary', '').up()
        .ele('summaryformat', '').up()
        .ele('sequence', '').up()
        .ele('visible', '').up()
        .ele('availabilityjson', '').up()
        .ele('timemodified', '').up()
        .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'section.xml'), sectionXml);

    return sectionXml;
}

module.exports = { generateSectionXml }



