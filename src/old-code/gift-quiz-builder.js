const fs = require("fs");
const { parse } = require("../utils/quiz-parser");
const { writeFileCallback } = require("../utils/utils");

const createAnswer = (answer, i, allAnswers) => {
  const totalAnswers = allAnswers.length;
  const correctAnswers = allAnswers.filter((a) => a.correct).length;

  // moodle needs the precision to be five decimals
  const pointsFromCorrect = (100 / correctAnswers).toFixed(5);
  const pointsFromIncorrect =  (100 / (totalAnswers - correctAnswers)).toFixed(5);

  const correct = answer.correct
    ? `~%${pointsFromCorrect}%`
    : `~%-${pointsFromIncorrect}%`;

  return `${correct} ${answer.answer.trim()}`;
};

const escapeColon = (str) => str.replace(/:/g, "\\:");

const createQuestion = (question) => {
  const answers = question.answers.map(createAnswer);

  return `::${question.title.trim()}::
${escapeColon(question.question.trim())}{
  ${answers.join("\n  ")}
}`;
};

const createQuestions = (questions) =>
  questions.map(createQuestion).join("\n\n");

const writeTheGIFT = (filename, content) =>
  fs.writeFile(filename, content, writeFileCallback);

const readFileCallback = (outputPath) => (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  writeTheGIFT(outputPath, createQuestions(parse(data)));
};

const buildQuizGift = (path, outputPath) =>
  fs.readFile(path, "utf8", readFileCallback(outputPath));

module.exports = buildQuizGift;
