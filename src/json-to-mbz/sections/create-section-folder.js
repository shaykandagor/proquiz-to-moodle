/* const fs = require("fs");
const path = require("path");

function createSectionsFolders(outputDir, jsonFilePath, numberFolders) {
    // Read JSON file
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    const data = JSON.parse(jsonData);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Extract the first wp_post_id
    if (data.wp_data.length === 0) {
        console.error("No wp_data found in JSON file.");
        return;
    }
    const firstId = data.wp_data[0].wp_post_id;

    // Create the specified number of folders starting from the first wp_post_id
    for (let i = 0; i < numberFolders; i++) {
        const currentId = firstId + i;
        const dirPath = path.join(outputDir, `section_${currentId}`);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }
}

// Example usage
const outputDir = './output';
const jsonFilePath = './export-file-sfwd-courses-2024-07-01-11-30-19.json'; // Path to your JSON file
const numberFolders = 3; // Number of folders to create
generateSectionsFolders(outputDir, jsonFilePath, numberFolders);

module.exports = createSectionsFolders; */