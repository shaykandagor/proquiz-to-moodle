const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');
const { DOMParser } = require('xmldom');
const xpath = require('xpath');
const crypto = require('crypto');

function extractInfoFromXml(inputFile) {
    const xml = fs.readFileSync(inputFile, 'utf8');
    const doc = new DOMParser().parseFromString(xml, 'text/xml');

    let contextid = '';
    let source = '';

    try {
        const contextidNode = xpath.select1('//activity/@contextid', doc); // Select the contextid attribute from the activity element
        const sourceNode = xpath.select1('//figure[@class="wp:audio"]/audio/@src', doc);
        const itemidNode = xpath.select1('//chapter/@id', doc);

        contextid = contextidNode ? contextidNode.value : '';
        source = sourceNode ? sourceNode.value : '';
        itemid = itemidNode ? itemidNode.value : '';

        // Debugging output
        console.log('contextidNode:', contextidNode);
        console.log('sourceNode:', sourceNode);
        console.log('itemidNode:', itemidNode);
    } catch (error) {
        console.error('Error extracting information from XML:', error);
    }
    console.log('extractInfoFromXml:', { contextid, source, itemid });

    return { contextid, source, itemid };
}

// Function to compute SHA-1 hash of a file
function computeFileHash(filePath) {
    const fileBuffer = fs.readFileSync(filePath)
    const hashSum = crypto.createHash('sha1');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
}

// Function to generate a random id
function generateRandomId() {
    return Math.floor(Math.random() * 90000000) + 10000000; // Generates an 8-digit number
}

// Generates files.xml file inside 'output' directory
async function createFilesXml(finalDir, inputFile, fileToHash, component = 'book', filearea = 'chapter') {
    console.log('createFilesXml called with:', { finalDir, inputFile, fileToHash });

    if (!fileToHash) {
        throw new TypeError('The "fileToHash" argument must be of type string or an instance of Buffer or URL. Received undefined');
    }

    const info = extractInfoFromXml(inputFile);
    const contentHash = computeFileHash(fileToHash);
    const filename = path.basename(fileToHash);
    const filesize = fs.statSync(fileToHash).size;

    // Dynamically import the mime package
    const mimeModule = await import('mime');
    const mime = mimeModule.default;
    const mimetype = mime.getType(fileToHash);

    const timestamp = Math.floor(Date.now() / 1000);

    // Extract the directory path for the filepath attribute
    const filepath = path.dirname(fileToHash) + '/';

    const fileXml = xmlbuilder.create('files', { encoding: 'UTF-8' })
        .ele('file', { id: generateRandomId() }) // Generate a random 8-digit number
            .ele('contenthash', contentHash).up()
            .ele('contextid', info.contextid).up()
            .ele('component', component).up()
            .ele('filearea', filearea).up()
            .ele('itemid', info.itemid).up()
            .ele('filepath', filepath).up()
            .ele('filename', filename ).up()
            .ele('userid', '$@NULL@$').up()
            .ele('filesize', filesize).up()
            .ele('mimetype', mimetype).up()
            .ele('status', '0').up()
            .ele('timecreated', timestamp).up()
            .ele('timemodified', timestamp).up()
            .ele('source', info.source).up()
            .ele('author', '$@NULL@$').up()
            .ele('license', '$@NULL@$').up()
            .ele('sortorder', '0').up()
            .ele('repositorytype', '$@NULL@$').up()
            .ele('repositoryid', '$@NULL@$').up()
            .ele('reference', '$@NULL@$').up()
        .end({ pretty: true });

    fs.writeFileSync(path.join(finalDir, 'files.xml'), fileXml);

    return fileXml;
}

module.exports = { createFilesXml };
