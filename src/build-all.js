// TODO: is this file needed after json-to-mbz folder is completed?

const config = require("../config.json");

const buildQuizGift = require("./old-code/gift-quiz-builder");
const buildQuiz2XML = require("./old-code/xml-quiz2-builder");
const buildLessonsXml = require("./old-code/xml-lessons-builder");
const buildQuizTrueFalseXml = require("./old-code/xml-quiz3-builder");
const buildTopicsXml = require("./old-code/xml-topics-builder");
const { createFilePath } = require("./utils/utils");
const buildTopicsHtml = require("./old-code/html-topics-builder");
const buildLessonsHtml = require("./old-code/html-lessons-builder");

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
