const fs = require("fs");
const path = require("path");
const xmlbuilder = require("xmlbuilder");

// Function to generate XML from groups data
const generateGroupsXml = (groups) => {
    const xml = xmlbuilder.create("groups");

    groups.forEach((group) => {
        const groupElement = xml.ele("group", { name: group.name });
        groupElement.ele("idnumber", group.idnumber);
        groupElement.ele("description", group.description);
        groupElement.ele("descriptionformat", group.descriptionformat);
        groupElement.ele("enrolmentkey", group.enrolmentkey);
        groupElement.ele("picture", group.picture);
        groupElement.ele("hidepicture", group.hidepicture);
        groupElement.ele("timecreated", group.timecreated);
        groupElement.ele("timemodified", group.timemodified);
        const membersElement = groupElement.ele("group_members");
        group.group_members.forEach((member) => {
            membersElement.ele("member", member);
        });
    });

    const xmlString = xml.end({ pretty: true });

    return xmlString;
};

// Function to create content from JSON data
const createContent = (data) =>
    JSON.parse(data).wp_data.map(
        ({ wp_post_id, wp_post_title, wp_post_name, wp_post_content }) => ({
            id: wp_post_id, // Group ID
            title: wp_post_title, // Group title
            name: wp_post_name, // Group name
            content: wp_post_content, // Group content
            description: wp_post_content, // Group description
            descriptionformat: 1, // Description format
            idnumber: wp_post_id, // Group ID number
            enrolmentkey: "", // Enrolment key
            picture: "", // Picture
            hidepicture: 0, // Hide picture flag
            timecreated: 0, // Time created
            timemodified: 0, // Time modified
            group_members: [] // Group members (empty for now)
        })
    );

// Function to write content to a file
const writeFile = (filename, content, callback) =>
    fs.writeFile(filename, content, callback);

// Callback function to read file and generate XML
const readFileCallback = (outputPath) => (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    const content = createContent(data);

    const xml = generateGroupsXml(content);

    writeFile(outputPath, xml, (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log("File written successfully to", outputPath);
        }
    });
};

// Function to build XML from JSON file
const buildGroupsXml = (jsonFilePath, finalDir) => {
    const outputPath = path.join(finalDir, "groups.xml");
    fs.readFile(jsonFilePath, "utf8", readFileCallback(outputPath));
};

module.exports = { buildGroupsXml };