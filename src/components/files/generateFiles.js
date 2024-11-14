const { generateDocumentXml } = require("./document-files/generateDocumentXml");

function generateFiles(fileDir) {
    generateDocumentXml(fileDir);
}

module.exports = { generateFiles };