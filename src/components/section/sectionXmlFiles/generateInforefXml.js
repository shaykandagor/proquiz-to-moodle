const fs = require("fs");
const path = require("path");
const xmlbuilder = require("xmlbuilder");

// Generates inforef.xml inside 'sections' directory inside 'section'
// sections\section\inforef.xml
function generateInforefXml(sectionDir){

    // Ensure the directory exists
    if (!fs.existsSync(sectionDir)) {
        fs.mkdirSync(sectionDir, { recursive: true });
    }
    
    const inforefXml = xmlbuilder.create('inforef', { encoding: 'UTF-8' })
        .ele('fileref')
            .ele('file',)
                .ele('id', '').up()
            .up()
        .up()
        .end({ pretty: true });
    fs.writeFileSync(path.join(sectionDir, 'inforef.xml'), inforefXml); 

    return inforefXml;
}

module.exports = { generateInforefXml }