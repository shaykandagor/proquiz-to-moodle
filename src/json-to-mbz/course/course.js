const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

// Function to create course content from JSON data
const createCourseContent = (data) =>
    JSON.parse(data).wp_data.map(
        ({
            wp_post_id,
            wp_post_title,
            wp_post_name,
            wp_post_content,
            wp_post_date,
            wp_post_modified,
        }) => ({
            id: wp_post_id,
            shortname: wp_post_name || "",
            fullname: wp_post_title || "",
            idnumber: "",
            summary: wp_post_content || "",
            summaryformat: 1,
            format: "topics",
            showgrades: 1,
            newsitems: 5,
            startdate: wp_post_date || "",
            enddate: "",
            marker: 0,
            maxbytes: 0,
            legacyfiles: 0,
            showreports: 0,
            visible: 1,
            groupmode: 0,
            groupmodeforce: 0,
            defaultgroupingid: 0,
            lang: "",
            theme: "",
            timecreated: wp_post_date || "",
            timemodified: wp_post_modified || "",
            requested: 0,
            enablecompletion: 0,
            completionnotify: 0,
            numsections: 1,
            hiddensections: 0,
            coursedisplay: 0,
        })
    );

// Function to update XML with course content
const updateXmlWithJsonContent = (xmlData, jsonContent) => {
    const parser = new xml2js.Parser();
    const builder = new xml2js.Builder();

    return new Promise((resolve, reject) => {
        parser.parseString(xmlData, (err, xmlResult) => {
            if (err) {
                return reject(`Error parsing XML: ${err.message}`);
            }

            // Ensure courses structure exists in XML
            if (!xmlResult.courses) {
                xmlResult.courses = { course: [] };
            } else {
                // Filter out any empty <course> elements
                xmlResult.courses.course = xmlResult.courses.course.filter((course) => {
                    // Check if all fields of the course object are empty or null
                    return Object.keys(course).some(
                        (key) =>
                            course[key] &&
                            Array.isArray(course[key]) &&
                            course[key].some((value) => value.trim())
                    );
                });
            }

            // Ensure jsonContent is an array
            if (!Array.isArray(jsonContent)) {
                return reject("JSON content is not an array.");
            }

            // Add JSON content to XML
            jsonContent.forEach((course) => {
                const newCourse = {
                    $: { id: course.id.toString() },
                    shortname: [course.shortname],
                    fullname: [course.fullname],
                    idnumber: [course.idnumber],
                    summary: [course.summary],
                    summaryformat: [course.summaryformat.toString()],
                    format: [course.format],
                    showgrades: [course.showgrades.toString()],
                    newsitems: [course.newsitems.toString()],
                    startdate: [course.startdate],
                    enddate: [course.enddate || ""],
                    marker: [course.marker.toString()],
                    maxbytes: [course.maxbytes.toString()],
                    legacyfiles: [course.legacyfiles.toString()],
                    showreports: [course.showreports.toString()],
                    visible: [course.visible.toString()],
                    groupmode: [course.groupmode.toString()],
                    groupmodeforce: [course.groupmodeforce.toString()],
                    defaultgroupingid: [course.defaultgroupingid.toString()],
                    lang: [course.lang || ""],
                    theme: [course.theme || ""],
                    timecreated: [course.timecreated],
                    timemodified: [course.timemodified],
                    requested: [course.requested.toString()],
                    enablecompletion: [course.enablecompletion.toString()],
                    completionnotify: [course.completionnotify.toString()],
                    numsections: [course.numsections.toString()],
                    hiddensections: [course.hiddensections.toString()],
                    coursedisplay: [course.coursedisplay.toString()],
                };
                xmlResult.courses.course.push(newCourse);
            });

            const updatedXml = builder.buildObject(xmlResult);
            resolve(updatedXml);
        });
    });
};


// Function to build courses XML from JSON file
const buildCoursesXml = (courseJsonFilePath, finalDir) => {
    const inputXmlFilePath = path.join("output", "mbz", "course", "course.xml"); // Original file
    const outputXmlFilePath = path.join("output", "final-mbz", "course", "course.xml"); // Updated file

    // Check if the input XML file exists
    if (!fs.existsSync(inputXmlFilePath)) {
        console.error("Error: Input XML file does not exist at:", inputXmlFilePath);
        return;
    }

    // Ensure the output directory exists
    fs.mkdir(finalDir, { recursive: true }, (err) => {
        if (err) {
            console.error("Error creating directory:", err.message);
            return;
        }

        fs.readFile(inputXmlFilePath, "utf8", (err, xmlData) => {
            if (err) {
                console.error("Error reading XML file. Ensure the XML file exists:", err.message);
                return;
            }

            fs.readFile(courseJsonFilePath, "utf8", (err, jsonData) => {
                if (err) {
                    console.error("Error reading JSON file. Ensure the JSON file exists:", err.message);
                    return;
                }

                let jsonContent;

                try {
                    jsonContent = createCourseContent(jsonData);
                } catch (parseErr) {
                    console.error("Error processing JSON data:", parseErr.message);
                    return;
                }

                updateXmlWithJsonContent(xmlData, jsonContent)
                    .then((updatedXml) => {
                        fs.writeFile(outputXmlFilePath, updatedXml, "utf8", (err) => {
                            if (err) {
                                console.error("Error writing updated XML file:", err.message);
                                return;
                            }
                            console.log("Successfully updated XML file at:", outputXmlFilePath);
                        });
                    })
                    .catch((updateErr) => {
                        console.error("Error updating XML content:", updateErr.message);
                    });
            });
        });
    });
};

module.exports = { buildCoursesXml };
