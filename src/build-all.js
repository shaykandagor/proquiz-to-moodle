const config = require("../config.json");

const buildQuizGift = require("./gift-quiz-builder");
const buildLessonsXml = require("./xml-lessons-builder");
const buildQuizTrueFalseXml = require("./xml-quiz3-builder");
const buildTopicsXml = require("./xml-topics-builder");

const createFilePath = (config, key) => {
  return `${config.basePath}/${config[key]}`;
};

buildQuizGift(createFilePath(config, "quizPath"), "output/quiz.gift");
buildLessonsXml(createFilePath(config, "lessonsPath"), "output/lessons.xml");
buildQuizTrueFalseXml(
  createFilePath(config, "quizPath"),
  "output/xml/quiz3.xml"
);
buildTopicsXml(createFilePath(config, "topicsPath"), "output/topics.xml");
