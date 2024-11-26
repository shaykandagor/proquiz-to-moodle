const writeFileCallback = (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
  console.log("file has been saved.");
};

const createFilePath = (config, key) => {
  return `${config.basePath}/${config[key]}`;
};

module.exports = {
  writeFileCallback,
  createFilePath,
};
