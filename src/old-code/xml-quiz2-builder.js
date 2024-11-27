// This file generates XML file which could be imported into Moodle as a quiz.

const fs = require("fs");
const xmlbuilder = require("xmlbuilder");
const { parse } = require("../utils/quiz-parser");
const { writeFileCallback } = require("../utils/utils");

const createQuestion = (root) => (question) => {
  const questionEle = root.ele("question", { type: question.type });
  questionEle.ele("name").ele("text", question.title);
  questionEle
    .ele("questiontext", { format: "html" })
    .ele("text")
    .raw(`<![CDATA[${question.question}]]>`);
  questionEle
    .ele("generalfeedback")
    .ele("text", question.generalfeedback || "");
  questionEle.ele("defaultgrade", question.defaultgrade || 1);
  questionEle.ele("penalty", question.penalty || 0);
  questionEle.ele("hidden", question.hidden || 0);

  const answersEle = questionEle.ele("answer");

  question.answers.forEach((answer) => {
    const answerEle = answersEle.ele("answer", { fraction: answer.fraction });
    answerEle
      .ele("text", { format: "html" })
      .raw(`<![CDATA[${answer.answer}]]>`);
    answerEle.ele("feedback").ele("text", answer.feedback || "");
  });
};

const createQuestions = (questions) => {
  const root = xmlbuilder.create("quiz", { encoding: "UTF-8" });

  questions.forEach(createQuestion(root));

  return root.end({ pretty: true });
};

const writeFile = (filename, content) =>
  fs.writeFile(filename, content, writeFileCallback);

const readFileCallback = (outputPath) => (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  writeFile(outputPath, createQuestions(parse(data)));
};

const buildQuiz2Xml = (path, outputPath) =>
  fs.readFile(path, "utf8", readFileCallback(outputPath));

module.exports = buildQuiz2Xml;
