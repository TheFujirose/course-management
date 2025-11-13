/**
 * @fileoverview
 * @author Carson Fujita
 * @version 1.0.0
 * @license GPL-3.0-or-later
 * @description description but more detailed
 */

const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
        return res.render("home", {
                courses: [
                        {
                                title: "Modern Web Technologies",
                                code: "CPAN212",
                                credits: 2,
                        },
                        {
                                title: "Data Structures & Algorithms",
                                code: "CPAN211",
                                credits: 2,
                        },
                        {
                                code: "CPAN214",
                                credits: 1,
                                title: "High-Level Prgrmng Languages",
                        },
                ],
        });
});

router.get("/courses", (req, res) => {
        res.redirect("/");
});

router.get("/courses/:id", (req, res) => {
        return res.render("courses", {
                course: {
                        title: "",
                        code: "",
                        credits: 0,
                },
        });
});
module.exports = router;
