const fs = require("fs");
const { parse } = require("../utils/quiz-parser");

const readFileCallback = (outputPath) => (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const content = parse(data);

  fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));
};

const buildQuizJson = (path, outputPath) =>
  fs.readFile(path, "utf8", readFileCallback(outputPath));

module.exports = buildQuizJson;
