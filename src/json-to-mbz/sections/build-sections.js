const createSectionsFolders = require("./create-section-folders");
const jsonContent = require("./jsonContent");
const generateCombinedJsonData = require("./jsonContent");
const sectionsJsonContent = require("./jsonContent");
const processSectionXmlFiles = require("./section");

async function buildSections(finalDir) {
  // step 1: create section folder and xml files
  await createSectionsFolders(finalDir);

  // step 2: generate JSON content from section folder id and json course data
  await generateCombinedJsonData(finalDir);

  // step 3: update section xml files using JSON content
  const sectionsJsonFilePath = "./exported_data/json/combined_sections.json";
  await processSectionXmlFiles(sectionsJsonFilePath, finalDir);

}

module.exports = buildSections;
