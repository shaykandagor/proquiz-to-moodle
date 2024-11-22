const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

// Function to create content from JSON data
const createContent = (data) =>
    JSON.parse(data).wp_data.map(
        ({ wp_post_id, wp_post_title, wp_post_name, wp_post_content, wp_post_date, wp_post_modified }) => ({
            id: wp_post_id, // Group ID
            title: wp_post_title || "", // Group title
            name: wp_post_name || "", // Group name
            description: wp_post_content || "", // Group description
            descriptionformat: 1, // Description format
            idnumber: wp_post_id || "", // Group ID number
            enrolmentkey: "", // Enrolment key
            picture: "", // Picture
            hidepicture: 0, // Hide picture flag
            timecreated: wp_post_date || "", // Time created
            timemodified: wp_post_modified || "", // Time modified
            group_members: [""] // Empty group members by default
        })
    );

// Function to update XML with JSON content
const updateXmlWithJsonContent = (xmlData, jsonContent) => {
    const parser = new xml2js.Parser();
    const builder = new xml2js.Builder();

    return new Promise((resolve, reject) => {
        parser.parseString(xmlData, (err, xmlResult) => {
            if (err) {
                return reject(err);
            }

            // Filter out empty groups
            xmlResult.groups.group = xmlResult.groups.group.filter(group => group.$.id);

            jsonContent.forEach(group => {
                const groupId = group.id.toString();
                const existingGroup = xmlResult.groups.group.find(g => g.$.id === groupId);

                if (existingGroup) {
                    existingGroup.idnumber = [group.idnumber.toString()];
                    existingGroup.name = [group.title];
                    existingGroup.description = [group.description];
                    existingGroup.descriptionformat = [group.descriptionformat.toString()];
                    existingGroup.enrolmentkey = [group.enrolmentkey];
                    existingGroup.picture = [group.picture];
                    existingGroup.hidepicture = [group.hidepicture.toString()];
                    existingGroup.timecreated = [group.timecreated];
                    existingGroup.timemodified = [group.timemodified];
                    existingGroup.group_members = [group.group_members]; // Empty group members
                } else {
                    const newGroup = {
                        $: { id: group.id.toString() },
                        idnumber: [group.idnumber.toString()],
                        name: [group.title],
                        description: [group.description],
                        descriptionformat: [group.descriptionformat.toString()],
                        enrolmentkey: [group.enrolmentkey],
                        picture: [group.picture],
                        hidepicture: [group.hidepicture.toString()],
                        timecreated: [group.timecreated],
                        timemodified: [group.timemodified],
                        group_members: [group.group_members] // Empty group members
                    };
                    xmlResult.groups.group.push(newGroup);
                }
            });

            const updatedXml = builder.buildObject(xmlResult);
            resolve(updatedXml);
        });
    });
};

// Function to build XML from JSON file
const buildGroupsXml = (jsonFilePath, finalDir) => {
    const inputXmlFilePath = path.join('output', 'mbz', 'groups.xml');
    const outputXmlFilePath = path.join(finalDir, 'groups.xml');

    // Ensure the finalDir exists
    fs.mkdir(finalDir, { recursive: true }, (err) => {
        if (err) {
            console.error("Error creating directory:", err);
            return;
        }

        // Read the existing XML file
        fs.readFile(inputXmlFilePath, "utf8", (err, xmlData) => {
            if (err) {
                console.error("Error reading XML file:", err);
                return;
            }

            // Read the JSON file
            fs.readFile(jsonFilePath, "utf8", (err, jsonData) => {
                if (err) {
                    console.error("Error reading JSON file:", err);
                    return;
                }

                const jsonContent = createContent(jsonData);

                // Update XML with JSON content
                updateXmlWithJsonContent(xmlData, jsonContent)
                    .then(updatedXml => {
                        // Write the updated XML back to the file
                        fs.writeFile(outputXmlFilePath, updatedXml, (err) => {
                            if (err) {
                                console.error("Error writing file:", err);
                            } else {
                                console.log("File written successfully to", outputXmlFilePath);
                            }
                        });
                    })
                    .catch(err => {
                        console.error("Error updating XML:", err);
                    });
            });
        });
    });
};

module.exports = { buildGroupsXml };/* const fs = require("fs");
const path = require("path");
const xmlbuilder = require("xmlbuilder");

// Function to generate XML from groups data
const generateGroupsXml = (groups) => {
    const xml = xmlbuilder.create("groups");

    groups.forEach((group) => {
        const groupElement = xml.ele("group", { id: group.id });
        groupElement.ele("idnumber", group.id);
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
        ({ wp_post_id, wp_post_title, wp_post_name, wp_post_content, wp_post_date }) => ({
            id: wp_post_id, // Group ID
            title: wp_post_title, // Group title
            name: wp_post_name, // Group name
            description: wp_post_content, // Group description
            descriptionformat: 1, // Description format
            idnumber: wp_post_id, // Group ID number
            enrolmentkey: "", // Enrolment key
            picture: "", // Picture
            hidepicture: 0, // Hide picture flag
            timecreated: wp_post_date, // Time created
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

    // Ensure the finalDir exists
    fs.mkdir(finalDir, { recursive: true }, (err) => {
        if (err) {
            console.error("Error creating directory:", err);
            return;
        }

        fs.readFile(jsonFilePath, "utf8", readFileCallback(outputPath));
    });
};

module.exports = { buildGroupsXml }; */