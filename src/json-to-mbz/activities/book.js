const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const he = require("he");
const { time } = require("console");
const { title } = require("process");

const generateRandomNumber = () => parseInt(Math.random() * 10000000);
const bookatt_id = () => parseInt(Math.random() * 10000);
const chapter_id = () => parseInt(Math.random() * 20000);

// Function to create content from JSON data
const createContent = (data) => {
  const jsonData = JSON.parse(data);
  return jsonData.wp_data.map((post) => {
    const {
      wp_post_id,
      wp_post_title,
      wp_post_content,
      wp_post_date_gmt,
      wp_post_date,
    } = post;

    const context_id = generateRandomNumber();
    const book_id = bookatt_id();
    const chapterid = chapter_id();

    return {
      id: book_id,
      contextid: context_id,
      moduleid: wp_post_id,
      name: wp_post_title,
      intro: wp_post_content,
      timemodified: wp_post_date_gmt,
      timecreated: wp_post_date,
      introformat: 1,
      numbering: 1,
      navstyle: 1,
      customtitles: 0,
      // inside chapters
      chapterid: chapterid,
      pagenum: 1,
      subchapter: 0,
      title: "Chapter 1" || "",
      content: "Chapter 1 content" || "",
      contentformat: 1,
      hidden: 0,
      timemodified: "",
      importsrc: "",
      //chapters: jsonData.topics
      chapters: [],
    };
  });
};

// Function to update XML with JSON content
const updateBookXmlWithJsonContent = (xmlData, jsonContent) => {
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
      
      // Clear existing book in XML
     // result.chapters = { book: [] };

      // Update the XML content with JSON content
      result.activity.$.id = jsonContent.id;
      result.activity.$.moduleid = jsonContent.moduleid;
      result.activity.$.contextid = jsonContent.contextid;
      result.activity.book[0].$.id= jsonContent.id;
      result.activity.book[0].name[0] = jsonContent.name;
      result.activity.book[0].intro[0] = jsonContent.intro;
      result.activity.book[0].introformat[0] = jsonContent.contentformat;
      result.activity.book[0].numbering[0] = jsonContent.numbering;
      result.activity.book[0].navstyle[0] = jsonContent.navstyle;
      result.activity.book[0].customtitles[0] = jsonContent.customtitles;
      result.activity.book[0].timecreated[0] = jsonContent.timecreated;
      result.activity.book[0].timemodified[0] = jsonContent.timemodified;

      // Update chapters 
      // TODO: data is found in topics json
      /* result.activity.book[0].chapters[0].chapter.forEach((chapter, index) => {
        const jsonChapter = jsonContent.chapters[index];
        chapter.$.id = jsonChapter.id;
        chapter.pagenum[0] = jsonChapter.pagenum;
        chapter.subchapter[0] = jsonChapter.subchapter;
        chapter.title[0] = jsonChapter.title;
        chapter.content[0] = he.encode(jsonChapter.content, { useNamedReferences: true });
        chapter.contentformat[0] = jsonChapter.contentformat;
        chapter.hidden[0] = jsonChapter.hidden;
        chapter.timemodified[0] = jsonChapter.timemodified;
        chapter.importsrc[0] = jsonChapter.importsrc;
      }); */

      const updatedXml = builder.buildObject(result);
      resolve(updatedXml);
    });
  });
};

// Function to read, update, and write XML files
const processBookXmlFiles = (jsonFilePath, xmlDirPath) => {

  fs.readFile(jsonFilePath, "utf8", (err, jsonData) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }

    const jsonContentArray = createContent(jsonData);

     // List directories in xmlDirPath that start with "page_"
     const pageDirs = fs.readdirSync(xmlDirPath).filter(dir => dir.startsWith('book_'));

     pageDirs.forEach((dir) => {
       const dirPath = path.join(xmlDirPath, dir);
       const xmlFilePath = path.join(dirPath, "book.xml");
 
       // Extract the folder ID from the directory name
       const folderId = dir.split('_')[1];
 
       // Find the corresponding jsonContent based on folderId
       const jsonContent = jsonContentArray.find(content => content.moduleid == folderId);
 
       if (!jsonContent) {
         console.error(`No JSON content found for folder ID: ${folderId}`);
         return;
       }
 
       console.log(`Processing book XML file: ${xmlFilePath}`);
 
       fs.readFile(xmlFilePath, "utf8", (err, xmlData) => {
         if (err) {
           console.error(`Error reading XML file: ${xmlFilePath}`, err);
           return;
         }
 
         updateBookXmlWithJsonContent(xmlData, jsonContent, folderId)
           .then((updatedXml) => {
             fs.writeFile(xmlFilePath, updatedXml, "utf8", (err) => {
               if (err) {
                 console.error(`Error writing XML file: ${xmlFilePath}`, err);
                 return;
               }
               console.log(`Updated XML file: ${xmlFilePath}`);
             });
           })
           .catch((err) => {
             console.error("Error updating XML content:", err);
           });
       });
     });
  });
};

module.exports = { processBookXmlFiles };