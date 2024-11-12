const fs = require("fs");
const path = require("path");
const xmlbuilder = require("xmlbuilder");

function generateCompletionXml(outputDir) {
  const completionXml = xmlbuilder
    .create("course_completion", { encoding: "UTF-8" })
    .end({ pretty: true });
  fs.writeFileSync(path.join(outputDir, "completion.xml"), completionXml);

  return completionXml;
}

module.exports = { generateCompletionXml };
