const fs = require("fs");
const { write } = require("../utils/utils");
const { generateHtml } = require("../utils/html");

const createContent = (data) =>
  JSON.parse(data).wp_data.map(
    ({ wp_post_content, wp_post_title, wp_post_name }) => ({
      title: wp_post_title,
      content: wp_post_content,
      name: wp_post_name,
    })
  );

const buildLessonsHtml = (filePath) => {
  const data = fs.readFileSync(filePath, "utf8");

  createContent(data).forEach((lesson) => {
    write(
      "output/html/lessons",
      `output/html/lessons/${lesson.name}.html`,
      generateHtml(lesson, filePath, "lessons")
    );
  });
};

module.exports = buildLessonsHtml;
