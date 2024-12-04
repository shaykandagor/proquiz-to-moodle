const fs = require('fs');
const path = require('path');
const generateBoaInforefXml = require('../../components/activities/board-xml-files/generateBoaInforefXml');
const { generateSectionXml } = require('../../components/section/sectionXmlFiles/generateSectionXml');

function createSectionsFolders(finalDir, startId, numberOfSections) {

    // Ensure the parent "sections" folder exists
    if (!fs.existsSync(finalDir)) {
        fs.mkdirSync(finalDir, { recursive: true });
        console.log(`Created parent folder: ${finalDir}`);
    } else {
        console.log(`Parent folder already exists: ${finalDir}`);
    }

    // create sections folders
    for (let i = startId; i < startId + numberOfSections; i++) {
        const folderName = `section_${i}`;
        const folderPath = path.join(finalDir, folderName);

        // Check if the folder already exists
        if (!fs.existsSync(folderPath)) {
            // Create the folder
            fs.mkdirSync(folderPath);
            console.log(`Created folder: ${folderPath}`);
        } else {
            console.log(`Folder already exists: ${folderPath}`);
        }

        // Generate XML files inside the created subdirectory
        generateBoaInforefXml(folderPath);
        generateSectionXml(folderPath);
    }
}

module.exports = { createSectionsFolders };
