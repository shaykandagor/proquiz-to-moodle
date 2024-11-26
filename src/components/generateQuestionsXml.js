const fs = require("fs");
const path = require("path");
const xmlbuilder = require("xmlbuilder");

// Generates questions.xml file inside 'output' directory
// output\questions.xml
function generateQuestionsXml(outputDir) {
  const questionsXml = xmlbuilder
    .create("question_categories", { encoding: "UTF-8" })
    .end({ pretty: true });
  fs.writeFileSync(path.join(outputDir, "questions.xml"), questionsXml);
  return questionsXml;
}

module.exports = generateQuestionsXml;
