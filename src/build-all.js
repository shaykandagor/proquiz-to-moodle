const config = require("../config.json");

const buildQuizGift = require("./gift-quiz-builder");
const buildQuiz2XML = require("./xml-quiz2-builder");
const buildLessonsXml = require("./xml-lessons-builder");
const buildQuizTrueFalseXml = require("./xml-quiz3-builder");
const buildTopicsXml = require("./xml-topics-builder");
const { createFilePath } = require("./utils/utils");
const buildTopicsHtml = require("./html-topics-builder");
const buildLessonsHtml = require("./html-lessons-builder");

buildQuizGift(createFilePath(config, "quizPath"), "output/quiz.gift");
buildLessonsXml(createFilePath(config, "lessonsPath"), "output/lessons.xml");
buildQuizTrueFalseXml(
  createFilePath(config, "quizPath"),
  "output/xml/quiz3.xml"
);
buildTopicsXml(createFilePath(config, "topicsPath"), "output/topics.xml");

buildQuiz2XML(createFilePath(config, "quizPath"), "output/questions.xml");

buildLessonsHtml(createFilePath(config, "topicsPath"));
buildTopicsHtml(createFilePath(config, "topicsPath"));
