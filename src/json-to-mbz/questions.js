const fs = require("fs");
const path = require("path");
const xmlbuilder = require("xmlbuilder");
const { parse } = require("../utils/quiz-parser");

const stamp = "moodle.stamp+241010084236+sD8fiO";

// TODO: should not be used in the final product?
const generateRandomNumber = () => Math.random().toString(36).substring(7);


const createQuestionBankEntryForMultiChoice =
  (questionBankEntries) => (question) => {
    const id = generateRandomNumber();

    const questionBankEntry = questionBankEntries.ele("question_bank_entry", {
      id,
    });

    questionBankEntry.ele("questioncategoryid", "$@NULL@$"); // "NOT_SURE");
    questionBankEntry.ele("idnumber", "$@NULL@$");
    questionBankEntry.ele("ownerid", "$@NULL@$"); // "NOT_SURE");

    const questionVersion = questionBankEntry.ele("question_version");
    const questionVersions = questionVersion.ele("question_versions", {
      id: "$@NULL@$",
      // id: "NOT_SURE",
    });
    questionVersions.ele("version", 1);
    questionVersions.ele("status", "ready");

    const questionsEle = questionVersions.ele("questions");
    const questionEle = questionsEle.ele("question", {
      id: "$@NULL@$",
      // id: "NOT_SURE",
    });
    questionEle.ele("parent", 0);
    questionEle.ele("name", question.title.trim());
    questionEle.ele("questiontext", question.question.trim());
    questionEle.ele("questiontextformat", 1);
    questionEle.ele("generalfeedback", "");
    questionEle.ele("generalfeedbackformat", 1);
    questionEle.ele("defaultmark", "1.0000000");
    questionEle.ele("penalty", "0.3333333");
    questionEle.ele("qtype", "multichoice");
    questionEle.ele("length", 1);
    questionEle.ele("stamp", stamp);
    questionEle.ele("timecreated", +new Date());
    questionEle.ele("timemodified", +new Date());
    questionEle.ele("createdby", "$@NULL@$"); // "NOT_SURE");
    questionEle.ele("modifiedby", "$@NULL@$"); // "NOT_SURE");

    const pluginQtype = questionEle.ele("plugin_qtype_multichoice_question");
    const answersEle = pluginQtype.ele("answers");

    const numberOfAnswers = question.answers.length;

    question.answers.forEach((answer) => {
      const answerEle = answersEle.ele("answer", { id: answer.id });
      answerEle.ele("answertext", answer.answer.trim());
      answerEle.ele("answerformat", 0);
      // 1 for correct, negative fraction for incorrect
      answerEle.ele(
        "fraction",
        answer.correct ? 1 : `-${1 / (numberOfAnswers - 1)}`
      );
      answerEle.ele("feedback", "");
      answerEle.ele("feedbackformat", 0);
    });

    const multichoiceEle = pluginQtype.ele("multichoice", {
      id: question.multichoiceid,
    });
    multichoiceEle.ele("layout", 0);
    multichoiceEle.ele("single", 0);
    multichoiceEle.ele("shuffleanswers", 1);
    multichoiceEle.ele("correctfeedback", "");
    multichoiceEle.ele("correctfeedbackformat", 0);
    multichoiceEle.ele("partiallycorrectfeedback", "");
    multichoiceEle.ele("partiallycorrectfeedbackformat", 0);
    multichoiceEle.ele("incorrectfeedback", "");
    multichoiceEle.ele("incorrectfeedbackformat", 0);
    multichoiceEle.ele("answernumbering", "none");
    multichoiceEle.ele("shownumcorrect", 0);
    multichoiceEle.ele("showstandardinstruction", 1);

    questionEle.ele("plugin_qbank_comment_question").ele("comments");
    questionEle.ele("plugin_qbank_customfields_question").ele("customfields");
    questionEle.ele("question_hints");
    questionEle.ele("tags");
  };

const generateQuestionCategory = (questionsXml, category, questions) => {
  const questionCategory = questionsXml.ele("question_category");
  questionCategory.att("id", category.id);
  questionCategory.ele("name", category.name.trim());
  questionCategory.ele("contextid", category.contextid);
  questionCategory.ele("contextlevel", category.contextlevel);
  questionCategory.ele("contextinstanceid", category.contextinstanceid);
  questionCategory.ele("info", category.info || "");
  questionCategory.ele("infoformat", category.infoformat || 0);
  questionCategory.ele("stamp", category.stamp);
  questionCategory.ele("parent", category.parent || 0);
  questionCategory.ele("sortorder", category.sortorder || 0);
  questionCategory.ele("idnumber", category.idnumber || "$@NULL@$");
  const questionBankEntries = questionCategory.ele("question_bank_entries");

  questions.forEach(createQuestionBankEntryForMultiChoice(questionBankEntries));
};

function buildQuestionsXml(filePath, outputDir) {
  const file = fs.readFileSync(filePath, "utf8");

  const questionsXml = xmlbuilder.create("question_categories", {
    encoding: "UTF-8",
  });

  // TODO: Mock data
  const category = {
    id: "160594",
    name: "top",
    contextid: "1233447",
    contextlevel: "50",
    contextinstanceid: "5412",
    info: "",
    infoformat: "0",
    stamp,
    parent: "0",
    sortorder: "0",
    idnumber: "$@NULL@$",
  };

  const questions = parse(file);

  generateQuestionCategory(questionsXml, category, questions);

  fs.writeFileSync(
    path.join(outputDir, "questions.xml"),
    questionsXml.end({ pretty: true })
  );
}

module.exports = { buildQuestionsXml };
