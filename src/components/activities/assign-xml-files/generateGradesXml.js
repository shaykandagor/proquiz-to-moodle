const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateGradesXml(outputDir) {

    const gradesXml = xmlbuilder.create('activity_gradebook', { encoding: 'UTF-8' })
        .ele('grade_items')
            .ele('grade_item',  {id: '' })
                .ele('categoryid', '').up()
                .ele('itemname', '').up()
                .ele('itemtype', '').up()
                .ele('itemmodule', '').up()
                .ele('iteminstance', '').up()
                .ele('itemnumber', '').up()
                .ele('iteminfo', '').up()
                .ele('idnumber', '').up()
                .ele('calculation', '').up()
                .ele('gradetype', '').up()
                .ele('grademax', '').up()
                .ele('grademin', '').up()
                .ele('scaleid', '').up()
                .ele('outcomeid', '').up()
                .ele('gradepass', '').up()
                .ele('multfactor', '').up()
                .ele('plusfactor', '').up()
                .ele('aggregationcoef', '').up()
                .ele('aggregationcoef2', '').up()
                .ele('weightoverride', '').up()
                .ele('sortorder', '').up()
                .ele('display', '').up()
                .ele('decimals', '').up()
                .ele('hidden', '').up()
                .ele('locked', '').up()
                .ele('locktime', '').up()
                .ele('needsupdate', '').up()
                .ele('timecreated', '').up()
                .ele('timemodified', '').up()
                .ele('grade_grades', '').up()
            .up()
        .up()
        .ele('grade_letters', '')
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'grades.xml'), gradesXml);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    return gradesXml;
}

module.exports = generateGradesXml;