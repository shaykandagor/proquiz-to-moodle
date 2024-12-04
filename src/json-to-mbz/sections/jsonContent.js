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

      console.log("json", result);
      return result;
    } catch (error) {
      console.error("Error generating JSON content:", error);
      return [];
    }
}

module.exports = sectionsJsonContent;

const jsonContent = () => {
  // Read the JSON data from a file
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

  // Extract full <p> tags and the first <h1> to <h6> heading using regex
  const content = post5630.wp_post_content;

  // Match all <p> tags, including nested HTML elements like <strong>, <em>, etc.
  const paragraphs = [...content.matchAll(/<p>.*?<\/p>/gs)].map(
    (match) => match[0]
  );

  // Match all <h1> to <h6> headings (preserving the tags)
  const headings = [...content.matchAll(/<h[1-6]>.*?<\/h[1-6]>/gs)].map(
    (match) => match[0]
  );

  // Optionally, extract <ul>, <ol>, <li> tags if needed
  const lists = [...content.matchAll(/<li>.*?<\/li>/gs)].map(
    (match) => match[0]
  );
  // Ensure there are enough paragraphs
  if (paragraphs.length < 2) {
    throw new Error(
      "Not enough paragraphs in the content to extract the first two."
    );
  }

  // Construct the JSON result 
  const result = headings.map((heading, index) => {
    return {
      wp_post_content: [
        heading || "", // Heading for this section (if exists)
        ...paragraphs.slice(index * 2, index * 2 + 2), // Two paragraphs per section
        ...lists, // Include lists if available
      ],
    };
  });

  console.log("Generated JSON Content from json data");

};

module.exports = jsonContent;

