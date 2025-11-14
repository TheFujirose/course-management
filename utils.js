const { createDraftSafeSelectorCreator } = require("@reduxjs/toolkit");
const Course = require("./models/course");
const express = require("express");
const mongoose = require("mongoose");

class CodeExistError extends Error {
        constructor(match) {
                super(`Course code ${match.code} already exists on course id: ${match._id}`);
                this.name = "CodeExistsError";
                this.match = match;
        }
}

/**
 * This will update the course with the matching update, or create one if id is zero
 * @param {string} id - id of the course to update
 */
async function updateCourse(courseCode, courseTitle, courseCredits, id = "") {
        /**
         * If id is invalid make a new one; this won't happen if id is non-zero
         * @type {mongoose.Types.ObjectId}
         */
        if (!id) {
                return addCourse(courseCode, courseTitle, courseCredits);
        }
        const options = {
                new: true, // returns modified document
                upsert: true, //create a new document if no document matches
        };

        return await Course.findByIdAndUpdate(
                id,
                {
                        code: courseCode,
                        title: courseTitle,
                        credits: courseCredits,
                },
                options,
        );
}

/**
 * @param {string} id - the ID of the Course to delete
 */
async function deleteCourse(id) {
        await Course.findByIdAndDelete(id);
}


/**
 * @param {string} courseCode - the code
 * @param {string} courseTitle - the title
 * @param {number} courseCredits - credits of course
 */
async function addCourse(courseCode, courseTitle, courseCredits) {
        const match = await Course.findOne({ code: courseCode });
        if (match && match._id) {
                return updateCourse(courseCode, courseTitle, courseCredits, match._id);
                //comes with an id so there is no risk of recursion
        } else
                if (courseCode && courseTitle && courseCredits) {
                        const newCourse = new Course({
                                code: courseCode,
                                title: courseTitle,
                                credits: courseCredits,
                        });
                        return await newCourse.save();
                } else {
                        throw new Error(`invalid course data: code:${courseCode} title: ${courseTitle} credits: ${courseCredits}`);
                }
}

module.exports = { updateCourse, deleteCourse, addCourse, CodeExistError };
