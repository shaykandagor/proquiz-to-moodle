/**
 * TODO: this file might not be needed if the GIFT format builder works well enough.
 * The idea of this file is to build an XML file for moodle import.
 */

const fs = require("fs");
const xmlbuilder = require("xmlbuilder");
const { parse } = require("../utils/quiz-parser");
const { writeFileCallback } = require("../utils/utils");

const createQuestion = (root) => (question) => {
  const questionEle = root.ele("question");
  questionEle.ele("id", question.id);
  questionEle.ele("quiz_id", question.quiz_id);
  questionEle.ele("title", question.title);
  questionEle.ele("questiontext", question.question);
  questionEle.ele("correctfeedback", question.correct_msg);
  questionEle.ele("incorrectfeedback", question.incorrect_msg);

  const answersEle = questionEle.ele("answers");

  question.answers.forEach((answer) => {
    const answerEle = answersEle.ele("answer");
    answerEle.ele("id", answer.id);
    answerEle.ele("answer", answer.answer);
    answerEle.ele("points", answer.points);
  });
};

const createQuestions = (questions) => {
  const root = xmlbuilder.create("quiz");

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

const buildQuizXml = (path, outputPath) =>
  fs.readFile(path, "utf8", readFileCallback(outputPath));

// const inputPath = process.argv[2];
// const outputPath = "output/quiz.xml";

// main(inputPath, outputPath);
