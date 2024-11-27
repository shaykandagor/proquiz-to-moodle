const fs = require("fs");
const path = require("path");

function createActivitiesFolders(outputDir, jsonData) {
  const activities = [
    { type: 'book', ids: [5874, 5898] },
    { type: 'page', ids: [6682, 6117] },
    { type: 'quiz', ids: [11174] },
  ];

   // Parse JSON data and populate activity IDs
   const data = JSON.parse(jsonData);
   data.wp_data.forEach((post) => {
     const { wp_post_id } = post;
     // Manually categorize IDs into different activities
     if (activities[0].ids.includes(wp_post_id)) {
       activities[0].ids.push(wp_post_id);
     } else if (activities[1].ids.includes(wp_post_id)) {
       activities[1].ids.push(wp_post_id);
     } else if (activities[2].ids.includes(wp_post_id)) {
       activities[2].ids.push(wp_post_id);
     }
   });

  // Ensure the output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Create "activities" directory inside the output directory
  const activitiesDir = path.join(outputDir, "activities");
  if (!fs.existsSync(activitiesDir)) {
    fs.mkdirSync(activitiesDir, { recursive: true });
  }

  // Create subdirectories with IDs inside the "activities" directory
  activities.forEach((activity) => {
    activity.ids.forEach((id) => {
      const dirPath = path.join(activitiesDir, `${activity.type}_${id}`);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Created folder: ${dirPath}`);
      } else {
        console.log(`Folder already exists: ${dirPath}`);
      }
    });
  });
}

module.exports = createActivitiesFolders;