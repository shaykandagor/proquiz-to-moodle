const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateFiltersXml(outputDir) {
    const filtersXml = xmlbuilder.create('filters', { encoding: 'UTF-8' })
        .ele('filter_actives', '').up()
        .ele('filter_configs', '').up()
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'filters.xml'), filtersXml);

     // Ensure the output directory exists
     if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    return filtersXml;
}

module.exports = generateFiltersXml;