/**
 * @fileoverview 
 * @author Carson Fujita 
 * @version 1.0.0
 * @license GPL-3.0-or-later
 * @description description but more detailed
 */


const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
	return res.render("home")
});

module.exports = router
