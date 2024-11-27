const fs = require("fs");
const { parse } = require("../utils/quiz-parser");
const { writeFileCallback } = require("../utils/utils");

const createPointFractions = (points) => {
  const isFullPoints = points % 1 === 0;
  return isFullPoints ? points : points.toFixed(5);
};

const createAnswer = (answer, i, allAnswers) => {
  const totalAnswers = allAnswers.length;
  const correctAnswers = allAnswers.filter((a) => a.correct).length;

  const pointsFromCorrect = createPointFractions(100 / correctAnswers);
  const pointsFromIncorrect = createPointFractions(
    100 / (totalAnswers - correctAnswers)
  );

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
