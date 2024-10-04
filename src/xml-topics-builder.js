const fs = require("fs");
const xmlbuilder = require("xmlbuilder");
const { writeFileCallback } = require("./utils/utils");
const { generateHtml } = require("./utils/html");

const createContent = (data) =>
  JSON.parse(data).wp_data.map(
    ({ wp_post_content, wp_post_title, wp_post_name }) => ({
      title: wp_post_title,
      content: wp_post_content,
      name: wp_post_name,
    })
  );

const generateXml = (topics, path) => {
  const xml = xmlbuilder.create("topics");

  topics.forEach((topic) => {
    const lesson = xml.ele("topic", { title: topic.title });
    const html = generateHtml(topic, path, "topics")

    lesson.ele("content", html);
  });

  const xmlString = xml.end({ pretty: true });

  return xmlString;
};

const writeFile = (filename, content) =>
  fs.writeFile(filename, content, writeFileCallback);

const readFileCallback = (path, outputPath) => (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  console.log("outputPath", outputPath);

  const content = createContent(data)

  const xml = generateXml(content, path);

  writeFile(outputPath, xml);

  console.log("xml", xml);

//   .forEach((content) => {
//     writeFile(
//       outputPath,
//       //   `output/html/topics/${content.name}.html`,
//       // NOTE: generateHtml function will also copy files to the output folder
//       // this does not yet work with XML
//       // we will need to find a way to store the file paths and copy them after the XML is generated
//       // NOTE: some MBZ exports seem to store the images as Base64 encoded strings in the content
//       // NOTE: course material also contains MP3 files
//       generateXml(generateHtml(content, path, "topics"))
//     );
//   });
};

const main = (path, outputPath) =>
  fs.readFile(path, "utf8", readFileCallback(path, outputPath));

const inputPath = process.argv[2];
const outputPath = "output/topics.xml";

main(inputPath, outputPath);
