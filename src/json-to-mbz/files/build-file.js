const path = require("path");
const { createFilesXml } = require("../files");

function buildFilesXml(finalDir) {
    const inputFile = path.join("final-mbz", "activities", "book_5874", "book.xml");
    const audioFile = path.join("final-mbz", "files.xml");
    createFilesXml(inputFile, audioFile, finalDir);
}

module.exports = buildFilesXml;