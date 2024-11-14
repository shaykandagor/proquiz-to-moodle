const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateQuizXml(outputDir) {
    const quizXml = xmlbuilder.create('activity', { encoding: 'UTF-8' })
        .att({
            id: '',
            moduleid: '',
            modulename: 'quiz',
            contextid: ''
        })
        .ele('quiz', { id: '' })
            .ele('name', '').up()
            .ele('intro', '').up()
            .ele('introformat', '').up()
            .ele('timeopen', '').up()
            .ele('timeclose', '').up()
            .ele('timelimit', '').up()
            .ele('overduehandling', '').up()
            .ele('graceperiod', '').up()
            .ele('preferredbehaviour', '').up()
            .ele('canredoquestions', '').up()
            .ele('attempts_number', '').up()
            .ele('attemptonlast', '').up()
            .ele('grademethod', '').up()
            .ele('decimalpoints', '').up()
            .ele('questiondecimalpoints', '').up()
            .ele('reviewattempt', '').up()
            .ele('reviewcorrectness', '').up()
            .ele('reviewmarks', '').up()
            .ele('reviewspecificfeedback', '').up()
            .ele('reviewgeneralfeedback', '').up()
            .ele('reviewrightanswer', '').up()
            .ele('reviewoverallfeedback', '').up()
            .ele('questionsperpage', '').up()
            .ele('navmethod', '').up()
            .ele('shuffleanswers', '').up()
            .ele('sumgrades', '').up()
            .ele('grade', '').up()
            .ele('timecreated', '').up()
            .ele('timemodified', '').up()
            .ele('password', '').up()
            .ele('subnet', '').up()
            .ele('browsersecurity', '').up()
            .ele('delay1', '').up()
            .ele('delay2', '').up()
            .ele('showuserpicture', '').up()
            .ele('showblocks', '').up()
            .ele('completionattemptsexhausted', '').up()
            .ele('completionminattempts', '').up()
            .ele('allowofflineattempts', '').up()
            .ele('subplugin_quizaccess_seb_quiz').up()
            .ele('question_instances')
                .ele('question_instance', { id: '' })
                    .ele('quizid', '').up()
                    .ele('slot', '').up()
                    .ele('page', '').up()
                    .ele('requireprevious', '').up()
                    .ele('maxmark', '').up()
                    .ele('question_reference', { id: '' })
                        .ele('usingcontextid', '').up()
                        .ele('component', '').up()
                        .ele('questionarea', '').up()
                        .ele('questionbankentryid', '').up()
                        .ele('version', '$@NULL@$').up()
                    .up()
                .up()
            .up()
            .ele('sections')
                .ele('section', { id: '' })
                    .ele('firstslot', '1').up()
                    .ele('heading', '').up()
                    .ele('shufflequestions', '1').up()
                .up()
            .up()
            .ele('feedbacks')
                .ele('feedback', { id: '' })
                    .ele('feedbacktext', '').up()
                    .ele('feedbacktextformat', '').up()
                    .ele('mingrade', '').up()
                    .ele('maxgrade', '').up()
                .up()
            .up()
            .ele('overrides').up()
            .ele('grades').up()
            .ele('attempts').up()
        .up()
        .end({ pretty: true });

    fs.writeFileSync(path.join(outputDir, 'quiz.xml'), quizXml);

    return quizXml;
}

module.exports = generateQuizXml;