/**
 * @fileoverview Models for Mongodb
 * @author Carson Fujita
 */

const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
        {
                code: {
                        type: String,
                        required: true
                },
                title: {
                        type: String,
                        required: true
                },
                credits: {
                        type: String,
                        required: true
                }
        }
)

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
