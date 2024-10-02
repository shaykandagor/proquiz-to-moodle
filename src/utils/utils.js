const writeFileCallback = (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
  console.log("file has been saved.");
};

module.exports = {
  writeFileCallback,
};
