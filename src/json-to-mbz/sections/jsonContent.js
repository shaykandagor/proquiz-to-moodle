const fs = require('fs');

const jsonContent = () => {
    // Read the JSON data from a file
    const data = JSON.parse(fs.readFileSync('./exported_data/json/export-file-sfwd-courses-2024-07-01-11-30-19.json', 'utf-8')).wp_data;
    console.log(Array.isArray(data)); // Should print true

    // Find the post with wp_post_id: 5630
    const post5630 = data.find(post => post.wp_post_id === 5630);
    if (!post5630) {
        throw new Error("Post with wp_post_id 5630 not found.");
    }

    // Extract full <p> tags and the first <h1> to <h6> heading using regex
    const content = post5630.wp_post_content;

      // Match all <p> tags, including nested HTML elements like <strong>, <em>, etc.
      const paragraphs = [...content.matchAll(/<p>.*?<\/p>/gs)].map(match => match[0]);

      // Match all <h1> to <h6> headings (preserving the tags)
      const headings = [...content.matchAll(/<h[1-6]>.*?<\/h[1-6]>/gs)].map(match => match[0]);

      // Optionally, extract <ul>, <ol>, <li> tags if needed
      const lists = [...content.matchAll(/<li>.*?<\/li>/gs)].map(match => match[0]);
    // Ensure there are enough paragraphs
    if (paragraphs.length < 2) {
        throw new Error("Not enough paragraphs in the content to extract the first two.");
    }

    // Construct the JSON result with the first heading and the first two paragraphs for wp_post_id: 5630
    const result = [
        {
            wp_post_id: 5630,
            wp_post_content: [
                headings ? headings[0] : "", // First heading (if exists)
                ...paragraphs.slice(0, 2)  // First two paragraphs
            ]
        },
        {
            wp_post_id: 5631,
            wp_post_content: [
                headings ? headings[1] : "", // Second heading (if exists)
                ...paragraphs.slice(2, 4), // Second two paragraphs
                ...lists
            ]
        },
        {
            wp_post_id: 5632,
            wp_post_content: [
                headings ? headings[2] : "", // Third heading (if exists)
            ]
        }
    ];

    // Save the resulting JSON data to a new file
    fs.writeFileSync('./exported_data/json/sections.json', JSON.stringify({ wp_data: result }, null, 2));

    console.log('JSON file created with the following content:');
    console.log(JSON.stringify(result, null, 2));

    console.log('Processing complete. Exiting...');
    process.exit(0); // Ensure the script exits
};

module.exports = { jsonContent }