const fs = require("fs");
const {
  parse,
  unserialize,
  parseAnswer,
  removeEscapeChars,
} = require("../utils/quiz-parser");

const makeRawLog = (data, outputPath) => {
  const parsedData = JSON.parse(data);
  parsedData.quiz_pro.questions = parsedData.quiz_pro.questions
    .map(unserialize)
    .map((question) => ({
      ...question,
      answer_data: unserialize(removeEscapeChars(question.answer_data)).map(
        parseAnswer
      ),
    }));

  fs.writeFileSync(
    `${outputPath}.raw.json`,
    JSON.stringify(parsedData, null, 2)
  );
};

const readFileCallback = (outputPath) => (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const content = parse(data);

  fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));

  makeRawLog(data, outputPath);
};

const buildQuizJson = (path, outputPath) =>
  fs.readFile(path, "utf8", readFileCallback(outputPath));

module.exports = buildQuizJson;
