const path = require("path");
const createSectionsFolders = require("./create-section-folders");
const generateCombinedJsonData = require("./jsonContent");
const processSectionXmlFiles = require("./section");
const updateSectionXmlWithActivities = require("./section-sequence");

async function buildSections(finalDir) {
  // step 1: create section folder and xml files
  await createSectionsFolders(finalDir);

  // step 2: generate JSON content from section folder id and json course data
  await generateCombinedJsonData(finalDir);

  // step 3: update section xml files using JSON content
  const sectionsJsonFilePath = "./exported_data/json/combined_sections.json";
  await processSectionXmlFiles(sectionsJsonFilePath, finalDir);

  // step 4: update section.xml sequence tag with activity IDs
  const activitiesDir = path.join(finalDir, "activities");
  const sectionsDir = path.join(finalDir, "sections");
  const targetSection = "section_5634"; // The section to modify

  await updateSectionXmlWithActivities(activitiesDir, sectionsDir, targetSection);

}

module.exports = buildSections;
