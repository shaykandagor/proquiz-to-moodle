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

const buildTopicsHtml = (filePath) => {
  const data = fs.readFileSync(filePath, "utf8");

  createContent(data).forEach((content) => {
    write(
      "output/html/topics/",
      `output/html/topics/${content.name}.html`,
      generateHtml(content, filePath, "topics")
    );
  });
};

module.exports = buildTopicsHtml;
