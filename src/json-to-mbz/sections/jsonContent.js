const fs = require('fs');
const path = require('path');

const sectionsJsonContent = (finalDir) => {
    const sectionsDir = path.join(finalDir, "sections");
    try {
      const sectionFolderNames = fs.readdirSync(sectionsDir);

      const result = sectionFolderNames
        .filter((folderName) => folderName.startsWith("section_"))
        .map((folderName) => {
          const folderId = folderName.replace("section_", "");
          return { wp_post_id: parseInt(folderId) };
        });

      return result;
    } catch (error) {
      console.error("Error generating JSON content:", error);
      return [];
    }
}

const jsonContent = (sectionData) => {
  const data = JSON.parse(
    fs.readFileSync(
      "./exported_data/json/export-file-sfwd-courses-2024-07-01-11-30-19.json",
      "utf-8"
    )
  ).wp_data;

  // Find the post with wp_post_id: 5630
  const post5630 = data.find((post) => post.wp_post_id === 5630);
  if (!post5630) {
    throw new Error("Post with wp_post_id 5630 not found.");
  }

  const content = post5630.wp_post_content; // Extract content
  // Find all the headings (wp:heading tags) and content between them
  const headings = [
    ...content.matchAll(
      /<!-- wp:heading \{.*?\} -->.*?<\/h[1-6]>.*?<!-- \/wp:heading -->/gs
    ),
  ];

  const sections = [];

  // Start processing sections based on headings
  let currentSectionContent = "";
  let lastHeadingIndex = 0;

  // Loop through the content and collect text between headings
  headings.forEach((headingMatch, index) => {
    const heading = headingMatch[0];
    const nextHeadingIndex = headings[index + 1]
      ? headings[index + 1].index
      : content.length;

    // Extract content between the current heading and the next heading
    currentSectionContent = content
      .slice(lastHeadingIndex, nextHeadingIndex)
      .trim();

    // Add the section to the sections array
    sections.push({
      wp_post_id: 5630, // You can modify the wp_post_id for each section if needed
      wp_post_content: currentSectionContent,
    });

    // Update the last heading index for the next loop iteration
    lastHeadingIndex = nextHeadingIndex;
  });

  // Ensure there is content for the last section if no more headings exist
  if (lastHeadingIndex < content.length) {
    sections.push({
      wp_post_id: 5630,
      wp_post_content: content.slice(lastHeadingIndex).trim(),
    });
  }

  // Now we map this to sectionData (your original logic for combining data)
  const result = sectionData.map((section, index) => {
    const sectionContent = sections[index]
      ? sections[index].wp_post_content
      : "";
    return {
      wp_post_id: section.wp_post_id,
      wp_post_content: sectionContent,
    };
  });

  return result;
};

// Main function to run both tasks asynchronously
const generateCombinedJsonData = async (finalDir) => {
  try {
    // Step 1: Generate section data
    const sectionData = sectionsJsonContent(finalDir);

    // Step 2: Generate content JSON and combine it with section data
    const finalJson = jsonContent(sectionData);

    // Save the final combined JSON data to a file
    fs.writeFileSync(
      "./exported_data/json/combined_sections.json",
      JSON.stringify({ wp_data: finalJson }, null, 2)
    );

    console.log("JSON file created with the final combined data.");
  } catch (error) {
    console.error("Error during JSON generation:", error);
  }
};

module.exports = generateCombinedJsonData;
