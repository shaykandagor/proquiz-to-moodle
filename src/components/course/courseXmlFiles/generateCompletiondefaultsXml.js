const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

// Generates completiondefaults.xml inside 'course'
// course\completiondefaults.xml
const generateCompletiondefaultsXml = (outputDir) => { 
    const completiondefaultsXml = xmlbuilder.create('course_completion_defaults', { encoding: 'UTF-8' })
    .end({ pretty: true });
    fs.writeFileSync(path.join(outputDir, 'completiondefaults.xml'), completiondefaultsXml);

    return completiondefaultsXml;
}

module.exports = { generateCompletiondefaultsXml };
 