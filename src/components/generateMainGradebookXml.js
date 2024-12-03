const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

// Generates gradebook.xml file inside 'output' directory
// output\gradebook.xml

const grade_categ_id = () => parseInt(Math.random() * 10000);
const grade_item_id = () => parseInt(Math.random() * 100000);
const timestamp = Math.floor(Date.now() / 1000);


function generateMainGradebookXml(outputDir) {

    const grade_category = grade_categ_id();
    const grade_item = grade_item_id();
    const timecreated = timestamp;
    const timemodified = timestamp;

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const gradebookXml = xmlbuilder.create('gradebook', { encoding: 'UTF-8' })
        .ele('attributes').up()
        .ele('grade_categories')
            .ele('grade_category')
            .att('id', grade_category)
                .ele('parent', '$@NULL@$').up()
                .ele('depth', '1').up()
                .ele('path', `/${grade_category}/`).up()
                .ele('fullname', '?').up()
                .ele('aggregation', '13').up()
                .ele('keephigh', '0').up()
                .ele('droplow', '0').up()
                .ele('aggregateonlygraded', '0').up()
                .ele('aggregateoutcomes', '0').up()
                .ele('timecreated', timecreated).up()
                .ele('timemodified', timemodified).up()
                .ele('hidden', '0').up()
            .up()
        .up()
        .ele('grade_items')
            .ele('grade_item')
            .att('id', grade_item)
                .ele('categoryid', '$@NULL@$').up()
                .ele('itemname', '$@NULL@$').up()
                .ele('itemtype', 'course').up()
                .ele('itemmodule', '$@NULL@$').up()
                .ele('iteminstance', grade_category).up()
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
                .ele('timecreated', timecreated).up()
                .ele('timemodified', timemodified).up()
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

    fs.writeFileSync(path.join(outputDir, 'gradebook.xml'), gradebookXml);

    return gradebookXml;
}

module.exports = generateMainGradebookXml;