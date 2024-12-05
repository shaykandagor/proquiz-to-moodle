const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

const createContent = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData.wp_data.map((post) => {
        const {
            wp_post_id,
            wp_post_title,
            wp_post_content,
            wp_post_date_gmt,
        } = post;

        const module_id = generateRandomNumber();
        const context_id = generateRandomNumber();
        const quiz_id = att_id();

        return {
            activity_id: wp_post_id,
            moduleid: module_id,
            contextid: context_id,
            quizid: quiz_id,
            name: wp_post_title,
            intro: "",
            content: wp_post_content,
            timemodified: wp_post_date_gmt,
            contentformat: 1,
            legacyfiles: 0,
            legacyfileslast: "$@NULL@$",
        };
    });
};

// Function to update XML with JSON content
const updateXmlWithJsonContent = (xmlData, jsonContent) => {
    const parser = new xml2js.Parser();
    const builder = new xml2js.Builder({
        xmldec: { standalone: null, encoding: "UTF-8" },
        cdata: true
    });

    return new Promise((resolve, reject) => {
        parser.parseString(xmlData, (err, result) => {
            if (err) {
                return reject(err);
            }

            // Update the XML content with JSON content
            result.activity.$.id = jsonContent.activity_id;
            result.quiz.$.moduleid = jsonContent.moduleid;
            result.quiz.$.contextid = jsonContent.contextid;
            result.quiz.$.id = jsonContent.quizid;
            result.quiz.name = jsonContent.name;
            result.quiz.intro = jsonContent.intro;
            result.quiz.content = jsonContent.content;

            const xml = builder.buildObject(result);
            resolve(xml);
        });
    });
}

// Function to read, write and update XML file
const processQuizXml = (xmlFile, jsonFile, outputDir) => {
    const xmlData = fs.readFileSync(xmlFile, 'utf8');
    const jsonContent = createContent(jsonFile);

    return updateXmlWithJsonContent(xmlData, jsonContent)
        .then((xml) => {
            const fileName = path.basename(xmlFile);
            const outputFile = path.join(outputDir, fileName);
            fs.writeFileSync(outputFile, xml);
        });
};

module.exports = { processQuizXml };


