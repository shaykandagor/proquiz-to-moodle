const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates files.xml file inside 'output' directory
// output\files.xml
function generateMainFilesXml(outputDir) {
    const fileXml = xmlbuilder.create('files', { encoding: 'UTF-8' })
        .ele('file', { id: '' })
            .ele('contenthash', '').up()
            .ele('contextid', '').up()
            .ele('component', '').up()
            .ele('filearea', '').up()
            .ele('itemid', '').up()
            .ele('filepath', '').up()
            .ele('filename', '').up()
            .ele('userid', '').up()
            .ele('filesize', '').up()
            .ele('mimetype', '').up()
            .ele('status', '').up()
            .ele('timecreated', '').up()
            .ele('timemodified', '').up()
            .ele('source', '').up()
            .ele('author', '').up()
            .ele('license', '').up()
            .ele('sortorder', '').up()
            .ele('repositorytype', '').up()
            .ele('repositoryid', '').up()
            .ele('reference', '').up()
        .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'files.xml'), fileXml);

    return fileXml;
}

module.exports = generateMainFilesXml;