const fs = require("fs");
const { parse } = require("./utils/quiz-parser");
const { writeFileCallback } = require("./utils/utils");

const createAnswer = (answer) => {
  const correct = answer.correct ? "=" : "~";
  return `${correct} ${answer.answer}`;
};

const createQuestion = (question) => {
  const answers = question.answers.map(createAnswer);

  return `
::${question.title}::
${question.question}

{
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

const main = (path, outputPath) =>
  fs.readFile(path, "utf8", readFileCallback(outputPath));

const inputPath = process.argv[2];
const outputPath = "output/quiz.gift";

main(inputPath, outputPath);
