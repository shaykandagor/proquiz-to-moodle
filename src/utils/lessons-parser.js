const phpUnserialize = require("php-serialize");
const { omit } = require("lodash");

// this is for the php-serialize package to be able to unserialize the data
const classMap = {
  WpParapraph: function () {
    return {};
  },
};

// '0*0_answer' -> 'answer'
// "\\0*\\0_points" -> "points"
// remove all strings '0*0_' from the string
const remove0x0_chars = (str) => str.replace("0*0_", "");

const removeEscapeChars = (str) => str.replace(/\\/g, "");

const unserialize = (value) => {
    try {
      return phpUnserialize.unserialize(value, classMap);
    } catch (error) {
      console.error("Error unserializing value:", error);
      return value; // Return the original value if unserialization fails
    }
};

const parse = (data) => {
  const { wp_data } = JSON.parse(data);

  return wp_data.map((post) => {
    const content = removeEscapeChars(post.wp_post_content);

    const parsedContent = unserialize(content);

    const data = omit(post, ["wp_post_content"]);

    return {
      ...data,
      content: parsedContent,
    };
  });
};

module.exports = { parse };
