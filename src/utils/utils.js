const fs = require("fs");

const writeFileCallback = (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
};

const createFilePath = (config, key) => {
  return `${config.basePath}/${config[key]}`;
};

const write = (folder, path, content) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  fs.writeFileSync(path, content);
};

module.exports = {
  writeFileCallback,
  createFilePath,
  write,
};
