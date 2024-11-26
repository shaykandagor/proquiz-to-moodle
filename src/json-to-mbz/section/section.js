const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

// Function to create content from JSON data
const createContent = (data) =>
    JSON.parse(data).wp_data.map(
        ({ wp_post_id, wp_post_title, wp_post_name, wp_post_content, wp_post_date, wp_post_modified, wp_post_password }) => ({
            id: wp_post_id,
            title: wp_post_title || "",
            description: wp_post_content || "",
            descriptionformat: 1,
            idnumber: "",
            enrolmentkey: wp_post_password || "",
            picture: "",
            hidepicture: 0,
            timecreated: wp_post_date || "",
            timemodified: wp_post_modified || "",
        })
    );