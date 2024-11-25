const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

// Function to read JSON content
const readJsonFile = (jsonFilePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(jsonFilePath, "utf8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

// Function to read and modify the existing XML file
const modifyXmlFile = (xmlFilePath, jsonData, outputFilePath) => {
    fs.readFile(xmlFilePath, "utf8", (err, data) => {
        if (err) {
            console.error(`Error reading XML file: ${xmlFilePath}`);
            throw err;
        }
        xml2js.parseString(data, (err, result) => {
            if (err) {
                console.error(`Error parsing XML file: ${xmlFilePath}`);
                throw err;
            }

            // Modify the XML content with JSON data
            if (result.name) {
                result.name._ = jsonData.wp_post_name;
            } else {
                result.name = jsonData.wp_post_name;
            }

            // Convert the modified XML object back to a string
            const builder = new xml2js.Builder();
            const xmlString = builder.buildObject(result);

            // Ensure the output directory exists
            const outputDir = path.dirname(outputFilePath);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            // Write the updated XML file to the output directory
            fs.writeFile(outputFilePath, xmlString, (err) => {
                if (err) {
                    console.error(`Error writing XML file: ${outputFilePath}`);
                    throw err;
                }
                console.log(`XML file ${outputFilePath} updated successfully!`);
            });
        });
    });
};

// Function to read JSON content and modify XML files
const integrateJsonToXml = async (jsonFilePath, xmlFilePath, outputFilePath) => {
    try {
        const jsonData = await readJsonFile(jsonFilePath);
        console.log(jsonData);
        modifyXmlFile(xmlFilePath, jsonData, outputFilePath);
    } catch (err) {
        console.error(err);
    }
};

// Example usage:
const jsonFilePath = "C:/Users/ainaral/Documents/proquiz-to-moodle/exported_data/json/export-file-groups-2024-07-01-11-30-19.json";
const xmlFilePath = "C:/Users/ainaral/Documents/proquiz-to-moodle/output/mbz/groups.xml";
const outputFilePath = "C:/Users/ainaral/Documents/proquiz-to-moodle/final-mbz/groups.xml";

integrateJsonToXml(jsonFilePath, xmlFilePath, outputFilePath);

