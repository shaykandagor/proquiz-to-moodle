const { write } = require("./utils");

const generateTodoMarkdown = () => {
  const todo = require("../../output/todo.json");

  let markdown = "";
  for (const [title, warnings] of Object.entries(todo)) {
    markdown += `- [ ] Title: ${title}\n`;
    for (const [type, messages] of Object.entries(warnings)) {
      messages.forEach((message) => {
        markdown += `  - [ ] ${message}\n`;
      });
    }
  }

  return markdown;
};

const generateTodoMarkdownFile = () => {
  const markdown = generateTodoMarkdown();
  write("output", "output/todo.md", markdown);
};

module.exports = {
  generateTodoMarkdownFile,
};
