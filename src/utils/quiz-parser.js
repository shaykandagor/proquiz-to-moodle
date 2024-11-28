const phpUnserialize = require("php-serialize");
const { omit } = require("lodash");

// this is for the php-serialize package to be able to unserialize the data
const classMap = {
  WpProQuiz_Model_AnswerTypes: function () {
    return {};
  },
};

// '0*0_answer' -> 'answer'
// "\\0*\\0_points" -> "points"
// remove all strings '0*0_' from the string
const remove0x0_chars = (str) => str.replace("0*0_", "");

const removeEscapeChars = (str) => str.replace(/\\/g, "");

const unserialize = (value) => phpUnserialize.unserialize(value, classMap);

const parseAnswer = (answer) =>
  Object.entries(answer).reduce(
    (a, [key, value]) => ({ ...a, [remove0x0_chars(key)]: value }),
    {}
  );

const parse = (data) => {
  const { quiz_pro } = JSON.parse(data);

  return quiz_pro.questions.map(unserialize).map((question) => {
    const answer_data = removeEscapeChars(question.answer_data);

    const answers = unserialize(answer_data).map(parseAnswer);

    const data = omit(question, ["answer_data"]);

    return {
      ...data,
      answers,
    };
  });
};

module.exports = { parse, unserialize, removeEscapeChars, parseAnswer };
