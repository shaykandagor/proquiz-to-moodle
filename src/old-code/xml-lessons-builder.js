const fs = require("fs");
const xmlbuilder = require("xmlbuilder");
const { writeFileCallback } = require("../utils/utils");
const { generateHtml } = require("../utils/html");

const createContent = (data) =>
  JSON.parse(data).wp_data.map(({ wp_post_content, wp_post_title }) => ({
    title: wp_post_title,
    content: wp_post_content,
  }));

const generateXml = (lessons, path) => {
  const xml = xmlbuilder.create("lessons");

  lessons.forEach((lesson) => {
    const xmlLesson = xml.ele("lesson", { title: lesson.title });
    const html = generateHtml(lesson, path, "lessons");

    xmlLesson.ele("content", html);
  });

  const xmlString = xml.end({ pretty: true });

  return xmlString;
};

const writeFile = (filename, content) =>
  fs.writeFile(filename, content, writeFileCallback);

const readFileCallback = (path, outputPath) => (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const content = createContent(data);
  const xml = generateXml(content, path);

  writeFile(outputPath, xml);
};

const buildLessonsXml = (path, outputPath) =>
  fs.readFile(path, "utf8", readFileCallback(path, outputPath));

// const inputPath = process.argv[2];
// const outputPath = "output/lessons.xml";

// main(inputPath, outputPath);

module.exports = buildLessonsXml;
