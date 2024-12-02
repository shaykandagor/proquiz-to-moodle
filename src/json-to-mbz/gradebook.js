const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

// Generates gradebook.xml file inside 'final-mbz' directory
// final-mbz\gradebook.xml
function createGradebookXml(finalDir) {
    // Ensure the output directory exists
    if (!fs.existsSync(finalDir)) {
        fs.mkdirSync(finalDir, { recursive: true });
    }

    const gradebookXml = xmlbuilder.create('gradebook', { encoding: 'UTF-8' })
        .ele('attributes').up()
        .ele('grade_categories')
            .ele('grade_category', { id: '6643' })
                .ele('parent', '$@NULL@$').up()
                .ele('depth', '1').up()
                .ele('path', '/6643/').up()
                .ele('fullname', '?').up()
                .ele('aggregation', '13').up()
                .ele('keephigh', '0').up()
                .ele('droplow', '0').up()
                .ele('aggregateonlygraded', '0').up()
                .ele('aggregateoutcomes', '0').up()
                .ele('timecreated', '1723628835').up()
                .ele('timemodified', '1723628835').up()
                .ele('hidden', '0').up()
            .up()
        .up()
        .ele('grade_items')
            .ele('grade_item', { id: '79694' })
                .ele('categoryid', '$@NULL@$').up()
                .ele('itemname', '$@NULL@$').up()
                .ele('itemtype', 'course').up()
                .ele('itemmodule', '$@NULL@$').up()
                .ele('iteminstance', '6643').up()
                .ele('itemnumber', '$@NULL@$').up()
                .ele('iteminfo', '$@NULL@$').up()
                .ele('idnumber', '$@NULL@$').up()
                .ele('calculation', '$@NULL@$').up()
                .ele('gradetype', '1').up()
                .ele('grademax', '0.00000').up()
                .ele('grademin', '0.00000').up()
                .ele('scaleid', '$@NULL@$').up()
                .ele('outcomeid', '$@NULL@$').up()
                .ele('gradepass', '0.00000').up()
                .ele('multfactor', '1.00000').up()
                .ele('plusfactor', '0.00000').up()
                .ele('aggregationcoef', '0.00000').up()
                .ele('aggregationcoef2', '0.00000').up()
                .ele('weightoverride', '0').up()
                .ele('sortorder', '1').up()
                .ele('display', '0').up()
                .ele('decimals', '$@NULL@$').up()
                .ele('hidden', '0').up()
                .ele('locked', '0').up()
                .ele('locktime', '0').up()
                .ele('needsupdate', '0').up()
                .ele('timecreated', '1723628835').up()
                .ele('timemodified', '1723628835').up()
                .ele('grade_grades').up()
            .up()
        .up()
        .ele('grade_letters').up()
        .ele('grade_settings')
            .ele('grade_setting', { id: '' })
                .ele('name', 'minmaxtouse').up()
                .ele('value', '1').up()
            .up()
        .up()
        .end({ pretty: true });

    fs.writeFileSync(path.join(finalDir, 'gradebook.xml'), gradebookXml);

    return gradebookXml;
}

module.exports = { createGradebookXml };