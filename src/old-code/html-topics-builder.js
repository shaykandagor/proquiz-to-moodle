const fs = require("fs");
const { writeFileCallback } = require("../utils/utils");
const { generateHtml } = require("../utils/html");

const createContent = (data) =>
  JSON.parse(data).wp_data.map(
    ({ wp_post_content, wp_post_title, wp_post_name }) => ({
      title: wp_post_title,
      content: wp_post_content,
      name: wp_post_name,
    })
  );

const writeFile = (filename, content) =>
  fs.writeFile(filename, content, writeFileCallback);

const readFileCallback = (filePath) => (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  createContent(data).forEach((content) => {
    writeFile(
      `output/html/topics/${content.name}.html`,
      generateHtml(content, filePath, "topics")
    );
  });
};

const buildTopicsHtml = (filePath) =>
  fs.readFile(filePath, "utf8", readFileCallback(filePath));

module.exports = buildTopicsHtml;
