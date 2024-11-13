const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates gradebook.xml file inside 'output' directory
// output\gradebook.xml
function generateGradebookXml(outputDir) {
    const gradebookXml = xmlbuilder.create('gradebook', { encoding: 'UTF-8' })
        .ele('attributes').up()
        .ele('grade_categories')
            .ele('grade_category', { id: '' })
                .ele('parent', '').up()
                .ele('depth', '').up()
                .ele('path', '').up()
                .ele('fullname', '').up()
                .ele('aggregation', '').up()
                .ele('keephigh', '').up()
                .ele('droplow', '').up()
                .ele('aggregateonlygraded', '').up()
                .ele('aggregateoutcomes', '').up()
                .ele('timecreated', '').up()
                .ele('timemodified', '').up()
                .ele('hidden', '').up()
            .up()
        .up()
        .ele('grade_items')
            .ele('grade_item', { id: '' })
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
        .ele('grade_letters')
            .ele('grade_letter', { id: '' })
                .ele('lowerboundary', '').up()
                .ele('letter', '').up()
            .up()
        .up()
        .ele('grade_settings')
            .ele('grade_setting', { id: '' })
                .ele('name', '').up()
                .ele('value', '').up()
            .up()
        .up()
        .end({ pretty: true });

    fs.writeFileSync(path.join(outputDir, 'gradebook.xml'), gradebookXml);

    return gradebookXml;

}

module.exports = { generateGradebookXml };
