const fs = require("fs");
const path = require("path");
const xmlbuilder = require("xmlbuilder");

// Generates completion.xml file inside 'final-mbz' directory
// final-mbz\completion.xml
function createCompletionXml(finalDir) {
  const completionXml = xmlbuilder
    .create("course_completion", { encoding: "UTF-8" })
    .end({ pretty: true });
  fs.writeFileSync(path.join(finalDir, "completion.xml"), completionXml);

  return completionXml;
}

module.exports = { createCompletionXml };
