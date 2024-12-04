const createSectionsFolders = require("./create-section-folders");
const jsonContent = require("./jsonContent");
const generateCombinedJsonData = require("./jsonContent");
const sectionsJsonContent = require("./jsonContent");

async function buildSections(finalDir) {
  // step 1: create section folder and xml files
  await createSectionsFolders(finalDir);

  // step 2: generate JSON content from section folder id and json course data
  await generateCombinedJsonData(finalDir);

  // step 3: update JSON data using JSON course content

  // step 4: update section xml files using JSON content

}

module.exports = buildSections;
