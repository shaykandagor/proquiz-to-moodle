const fs = require("fs");
const path = require("path");
const { json } = require("stream/consumers");
const xml2js = require("xml2js");

const generateRandomNumber = () => parseInt(Math.random() * 10000000);
const att_id = () => parseInt(Math.random() * 10000);

const createContent = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData.wp_data.map((post) => {
        const {
            wp_post_id,
            wp_post_title,
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

            // Ensure the structure exists
            if (!result || !result.activity || !result.activity.quiz) {
                return reject(new Error("Unexpected XML structure"));
            }

            // Assuming result.activity.quiz is an array
            jsonContent.forEach((quiz, index) => {
                if (!result.activity.quiz[index]) {
                    result.activity.quiz[index] = { $: {} };
                }
                result.activity.quiz[index].id = quiz.activity_id;
                result.activity.quiz[index].$.moduleid = quiz.moduleid;
                result.activity.quiz[index].$.contextid = quiz.contextid;
                result.activity.quiz[index].$.quizid = quiz.quizid;
                result.activity.quiz[index].name = quiz.name;
                result.activity.quiz[index].intro = quiz.intro;
            });

            const updatedXml = builder.buildObject(result);
            resolve(updatedXml);
        });
    });
};

// Function to read, write and update XML file
const processQuizXml = (lessonsJsonFilePath, finalDir) => {
    const inputXmlFilePath = path.join("output", "mbz", "activities", "quiz", "quiz.xml");
    const outputXmlFilePath = path.join("final-mbz", "activities", "quiz_11174", "quiz.xml"); // Updated file


    // Check if the input XML file exists
    if (!fs.existsSync(inputXmlFilePath)) {
        console.error("Error: Input XML file does not exist at:", inputXmlFilePath);
        return;
    }

    fs.mkdir(finalDir, { recursive: true }, (err) => {
        if (err) {
          console.error("Error creating directory:", err.message);
          return;
        }

        fs.readFile(inputXmlFilePath, "utf8", (err, xmlData) => {
            if (err) {
              console.error(
                "Error reading XML file. Ensure the XML file exists:",
                err.message
              );
              return;
            }
      
            fs.readFile(lessonsJsonFilePath, "utf8", (err, jsonData) => {
              if (err) {
                console.error(
                  "Error reading JSON file. Ensure the JSON file exists:",
                  err.message
                );
                return;
              }

            const jsonContent = createContent(lessonsJsonFilePath);
            updateXmlWithJsonContent(xmlData, jsonContent)
                .then((updatedXml) => {
                    fs.writeFile(outputXmlFilePath, updatedXml, "utf8", (err) => {
                        if (err) {
                            console.error("Error writing updated XML file:", err.message);
                            return;
                        }
                        console.log(
                            "Updated XML file has been written to",
                            outputXmlFilePath
                        );
                    });
                })
                .catch((error) => {
                    console.error("Error updating XML with JSON content:", error);
                });
            });
        });
    });
};

module.exports = { processQuizXml };


