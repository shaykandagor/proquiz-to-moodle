const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateModuleXml(outputDir) { 
    const moduleXml = xmlbuilder.create('module', { encoding: 'UTF-8' })
    .att({ id: '', version: '' })
        .ele('modulename', '').up()
        .ele('sectionid', '').up()
        .ele('sectionnumber', '').up()
        .ele('idnumber', '').up()
        .ele('added', '').up()
        .ele('score', '').up()
        .ele('indent', '').up()
        .ele('visible', '').up()
        .ele('visibleoncoursepage', '').up()
        .ele('visibleold', '').up()
        .ele('groupmode', '').up()
        .ele('groupingid', '').up()
        .ele('completion', '').up()
        .ele('completiongradeitemnumber', '').up()
        .ele('completionpassgrade', '').up()
        .ele('completionview', '').up()
        .ele('completionexpected', '').up()
        .ele('availability', '').up()
        .ele('showdescription', '').up()
        .ele('downloadcontent', '').up()
        .ele('lang', '').up()
        .ele('plugin_plagiarism_turnitinsim_module')
            .ele('turnitinsim_mods', '').up()
        .up()
        .ele('tags', '').up()
        .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'module.xml'), moduleXml);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    return moduleXml;
}

module.exports = generateModuleXml;
