/**
 * @fileoverview API router calls
 * @author Carson Fujita
 * @version 1.0.0
 * @license GPL-3.0-or-later
 * @description description but more detailed
 */
const Course = require("./models/course");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { updateCourse, addCourse, deleteCourse, CodeExistError } = require("./utils");

/* --- Home Pages --- */
router.get("/", (req, res) => {
        res.render("home");
});

// this is not fully implemented (placeholder)
router.get("api/", (req, res) => {
        res.render("api");
});

/* --- VIEW COURSES --- */

router.get("/view", async (req, res) => {
        try {
                const data = await Course.find();
                if (data.length === 0) {
                        res.send(`<main>No data found. <a href="/">Add one here.</a></main>`);
                } else {
                        return res.render("view.ejs", {
                                courses: data,
                        });
                }
        } catch (err) {
                console.error(err);
                return res.status(500);
        }
});

/* --- UPDATE AND CREATE COURSES -- */

// UPDATE
router.get("/edit/:_id", async (req, res) => {
        const thisID = req.params._id;
        try {
                const found = await Course.findById(thisID);
                if (found.length === 0) {
                        res.send(
                                `<main>Id Invalid. <a href="/">Make a new Course here.</a></main`,
                        );
                } else {
                        return res.render("editor.ejs", { course: found });
                }
        } catch (e) {
                console.error(e);
                res.status(500).send({ message: ":( an unknown server error occured." });
        }
});

// CREATE
router.get("/edit", async (req, res) => {
        return res.render("editor", {
                course: {
                        _id: 0,
                        code: "",
                        title: "",
                        credits: 0,
                },
        });
});

/* -- posts -- */

// INSERT NEW
router.post("/insert", async (req, res) => {
        const data = req.body; //get the HTTPS body
        console.log(data);
        addCourse(data.code, data.title, data.credits)
                .then((course) => {
                        res.redirect("/view");
                })
                .catch((error) => {
                        if (error instanceof CodeExistError) {
                                res.render("error", { message: error.message, course: error.match })
                        } else {
                                console.error(error);
                                res.status(500).send({
                                        message: ":( An unknown server error occured.",
                                });
                        }
                });
});

router.post("/update", (req, res) => {
        updateCourse(
                req.body.code,
                req.body.title,
                req.body.credits,
                req.body.id
        ).then(() => {
                res.redirect("/view")
        }).catch((err) => {
                console.error(err);
                res.render("error", { message: err.message })
        });
})

router.post("/update/:id", (req, res) => {
        const data = req.body; //get the HTTPS body
        updateCourse(
                data.code,
                data.title,
                data.credits,
                req.params.id).then(() => {
                        res.redirect("/view")
                }).catch((err) => {
                        console.error(err);
                        res.render("error", {
                                message: err.message, course: {
                                        _id: data._id,
                                        code: data.code,
                                        title: data.title,
                                        credits: data.credits,
                                }
                        })
                });
});

/* --- Delete ---*/
router.post("/delete/:id", (req, res) => {
        deleteCourse(req.params.id);
        res.redirect('/view');
});

module.exports = router;
