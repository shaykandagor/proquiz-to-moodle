const fs = require("fs");
const path = require("path");
const xmlbuilder = require("xmlbuilder");

// Generates questions.xml file inside 'final-mbz' directory
// final-mbz\questions.xml
function createQuestionsXml(finalDir) {
  const questionsXml = xmlbuilder
    .create("question_categories", { encoding: "UTF-8" })
    .end({ pretty: true });
  fs.writeFileSync(path.join(finalDir, "questions.xml"), questionsXml);
  return questionsXml;
}

module.exports = createQuestionsXml;
