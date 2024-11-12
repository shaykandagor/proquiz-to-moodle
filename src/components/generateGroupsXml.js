const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

function generateGroupsXml(outputDir) {
    const groupsXml = xmlbuilder.create('groups', { encoding: 'UTF-8' })
        .ele('group', { id: '' })
            .ele('name', '').up()
            .ele('idnumber', '').up()
            .ele('description', '').up()
            .ele('descriptionformat', '').up()
            .ele('enrolmentkey', '').up()
            .ele('picture', '').up()
            .ele('hidepicture', '').up()
            .ele('timecreated', '').up()
            .ele('timemodified', '').up()
            .ele('group_members', '').up()
        .up()
            .ele('groupings')
                .ele('grouping', { id: '' })
                    .ele('name', '').up()
                    .ele('idnumber', '').up()
                    .ele('description', '').up()
                    .ele('descriptionformat', '').up()
                    .ele('configdata', '').up()
                    .ele('timecreated', '').up()
                    .ele('timemodified', '').up()
                    .ele('grouping_groups', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'groups.xml'), groupsXml);

    return groupsXml;
}

module.exports = { generateGroupsXml }