const fs = require("fs");
const path = require("path");
const xmlbuilder = require('xmlbuilder');

function generateFeedbackXml(outputDir) {
    const feedbackXml = xmlbuilder.create('activity', { encoding: 'UTF-8' })
        .att({
            id: '',
            moduleid: '',
            modulename: 'feedback',
            contextid: ''
        })
        .ele('feedback', { id: '' })
            .ele('name', '').up()
            .ele('intro', '').up()
            .ele('introformat', '').up()
            .ele('anonymous', '').up()
            .ele('email_notification', '').up()
            .ele('multiple_submit', '').up()
            .ele('autonumbering', '').up()
            .ele('site_after_submit', '').up()
            .ele('page_after_submit', '').up()
            .ele('page_after_submitformat', '').up()
            .ele('publish_stats', '').up()
            .ele('timeopen', '').up()
            .ele('timeclose', '').up()
            .ele('timemodified', '').up()
            .ele('completionsubmit', '').up()
            .ele('items')
                .ele('item', { id: '' })
                    .ele('template', '').up()
                    .ele('name', '').up()
                    .ele('label', '').up()
                    .ele('presentation', '').up()
                    .ele('typ', '').up()
                    .ele('hasvalue', '').up()
                    .ele('position', '').up()
                    .ele('required', '').up()
                    .ele('dependitem', '').up()
                    .ele('dependvalue', '').up()
                    .ele('options', '').up()
                .up()
            .up()
        .up()
        .end({ pretty: true });

    fs.writeFileSync(path.join(outputDir, 'feedback.xml'), feedbackXml);

    return feedbackXml;
}

module.exports = generateFeedbackXml;