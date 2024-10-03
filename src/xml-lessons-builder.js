const fs = require("fs");
const xmlbuilder = require("xmlbuilder");
const { writeFileCallback } = require("./utils/utils");

const createContent = (data) => {
  const json = JSON.parse(data);

  const content = json.wp_data.map(({ wp_post_content, wp_post_title }) => ({
    title: wp_post_title,
    content: wp_post_content,
  }));

  const xml = xmlbuilder.create("lessons");

  content.forEach(({ title, content }) => {
    const lesson = xml.ele("lesson", { title });
    lesson.ele("content", content);
  });

  const xmlString = xml.end({ pretty: true });

  return xmlString;
};

const writeFile = (filename, content) =>
  fs.writeFile(filename, content, writeFileCallback);

const readFileCallback = (outputPath) => (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  writeFile(outputPath, createContent(data));
};

const main = (path, outputPath) =>
  fs.readFile(path, "utf8", readFileCallback(outputPath));

const inputPath = process.argv[2];
const outputPath = "output/lessons.xml";

main(inputPath, outputPath);
