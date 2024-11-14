const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateFolderXml(outputDir) {
    const folderXml = xmlbuilder.create('activity', { encoding: 'UTF-8' })
        .att({
            id: '',
            moduleid: '',
            modulename: 'folder',
            contextid: ''
        })
        .ele('folder', { id: '' })
            .ele('name', '').up()
            .ele('intro', '').up()
            .ele('introformat', '').up()
            .ele('revision', '').up()
            .ele('timemodified', '').up()
            .ele('display', '').up()
            .ele('showexpanded', '').up()
            .ele('showdownloadfolder', '').up()
            .ele('forcedownload', '').up()
        .up()
        .end({ pretty: true });

    fs.writeFileSync(path.join(outputDir, 'folder.xml'), folderXml);

    return folderXml;
}

module.exports = generateFolderXml;