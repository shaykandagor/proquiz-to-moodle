const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

// This code will be to update the sequence tag in section.xml of a specific section
const updateSectionXmlWithActivities = (
  activitiesDir,
  sectionsDir,
  targetSection
) => {
  console.log("Processing section.xml for:", targetSection);

  const targetSectionPath = path.join(sectionsDir, targetSection);
  const sectionXmlFilePath = path.join(targetSectionPath, "section.xml");

  // Step 1: Extract activity IDs
  fs.readdir(activitiesDir, (err, activityFolders) => {
    if (err) {
      console.error("Error reading activities directory:", err);
      return;
    }

    // Extract numeric IDs from activity folder names (e.g., page_1 → 1)
    const activityIds = activityFolders
      .map((folder) => folder.split("_")[1])
      .filter(Boolean);

    console.log("Extracted activity IDs:", activityIds);

    // Step 2: Update section.xml for the target section
    if (fs.existsSync(sectionXmlFilePath)) {
      const xmlData = fs.readFileSync(sectionXmlFilePath, "utf8");
      const parser = new xml2js.Parser();
      const builder = new xml2js.Builder({
        xmldec: { standalone: null, encoding: "UTF-8" },
        cdata: true,
      });

      parser.parseString(xmlData, (err, result) => {
        if (err) {
          console.error("Error parsing XML:", err);
          return;
        }

        // Update the <sequence> tag with the activity IDs
        result.section.sequence = [activityIds.join(",")]; // Join IDs with a comma

        // Convert back to XML
        const updatedXml = builder.buildObject(result);

        // Write updated XML back to the file
        fs.writeFileSync(sectionXmlFilePath, updatedXml, "utf8");
        console.log("Updated section.xml successfully for:", targetSection);
      });
    } else {
      console.warn("section.xml not found in:", targetSectionPath);
    }
  });
};

module.exports = updateSectionXmlWithActivities;


