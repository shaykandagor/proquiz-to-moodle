const fs = require("fs");
const path = require("path");
const xmlbuilder = require("xmlbuilder");

// Generates inforef.xml inside 'sections' directory inside 'section'
// sections\section\inforef.xml
function generateSectionsInforefXml(sectionDir, id) {
  // Ensure the directory exists
  if (!fs.existsSync(sectionDir)) {
    fs.mkdirSync(sectionDir, { recursive: true });
  }

  const inforefXml = xmlbuilder
    .create("inforef", { encoding: "UTF-8" })
    .end({ pretty: true });

  fs.writeFileSync(path.join(sectionDir, "inforef.xml"), inforefXml);

  return inforefXml;
}

module.exports = { generateSectionsInforefXml };
