const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates filters.xml inside 'course'
// course\filters.xml
function generateFiltersXml(courseDir) {
    const filtersXml = xmlbuilder.create('filters', { encoding: 'UTF-8' })
    .ele('filter_actives', '').up()
    .ele('filter_configs', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(courseDir, 'filters.xml'), filtersXml);

    return filtersXml;
}

module.exports = { generateFiltersXml };
