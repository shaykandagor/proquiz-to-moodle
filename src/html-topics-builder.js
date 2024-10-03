const fs = require("fs");
const { writeFileCallback } = require("./utils/utils");
const { generateHtml } = require("./utils/html");

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

const readFileCallback = (path) => (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  createContent(data).forEach((content) => {
    writeFile(
      `output/html/topics/${content.name}.html`,
      generateHtml(content, path, "topics")
    );
  });
};

const main = (path) => fs.readFile(path, "utf8", readFileCallback(path));

const inputPath = process.argv[2];

main(inputPath);
