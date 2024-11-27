// TODO: is this file needed after json-to-mbz folder is completed?
// Notice that this file also creates the html files for the topics and lessons.
const fs = require("fs");
const config = require("../config.json");

const buildQuizGift = require("./old-code/gift-quiz-builder");
const buildQuiz2XML = require("./old-code/xml-quiz2-builder");
const buildLessonsXml = require("./old-code/xml-lessons-builder");
const buildQuizTrueFalseXml = require("./old-code/xml-quiz3-builder");
const buildTopicsXml = require("./old-code/xml-topics-builder");
const { createFilePath } = require("./utils/utils");
const buildTopicsHtml = require("./old-code/html-topics-builder");
const buildLessonsHtml = require("./old-code/html-lessons-builder");

if (!fs.existsSync("output/gift")) {
  fs.mkdirSync("output/gift", { recursive: true });
}
if (!fs.existsSync("output/xml")) {
  fs.mkdirSync("output/xml", { recursive: true });
}

buildQuizGift(createFilePath(config, "quizPath"), "output/gift/quiz.gift");

buildLessonsXml(
  createFilePath(config, "lessonsPath"),
  "output/xml/lessons.xml"
);
buildQuizTrueFalseXml(
  createFilePath(config, "quizPath"),
  "output/xml/quiz3.xml"
);
buildTopicsXml(createFilePath(config, "topicsPath"), "output/xml/topics.xml");

// generates in format which can be used to import questions into Moodle
buildQuiz2XML(createFilePath(config, "quizPath"), "output/xml/questions.xml");

buildLessonsHtml(createFilePath(config, "lessonsPath"));
buildTopicsHtml(createFilePath(config, "topicsPath"));
