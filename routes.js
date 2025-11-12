
/**
 * @fileoverview 
 * @author Carson Fujita 
 * @version 1.0.0
 * @license GPL-3.0-or-later
 * @description description but more detailed
 *
 * @example
 * provide example of use
 */


const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
	res.send("<h1>Hellow World!</h1>")
});

module.exports = router
