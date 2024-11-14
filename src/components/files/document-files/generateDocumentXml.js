const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

function generateDocumentXml(fileDir) {
    // Ensure the directory exists
    if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true });
    }
    const documentXml = xmlbuilder.create('document', { encoding: 'UTF-8' })
    .end({ pretty: true });
    fs.writeFileSync(path.join(fileDir, 'document.xml'), documentXml);

    return documentXml;
}

module.exports = { generateDocumentXml };