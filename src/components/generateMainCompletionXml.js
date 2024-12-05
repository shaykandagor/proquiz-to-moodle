const fs = require("fs");
const path = require("path");
const xmlbuilder = require("xmlbuilder");
 
// Generates completion.xml file inside 'output' directory
// output\completion.xml
function generateMainCompletionXml(outputDir) {
  const completionXml = xmlbuilder
    .create("course_completion", { encoding: "UTF-8" })
    .end({ pretty: true });
  fs.writeFileSync(path.join(outputDir, "completion.xml"), completionXml);

  return completionXml;
}

module.exports = generateMainCompletionXml;
