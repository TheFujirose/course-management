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

//import from .env
require('dotenv').config();

// Mongodb Connection String
const CONNECTION_STRING = process.env.CONNECTION_STRING

// Server port number
const PORT = process.env.PORT || 8000

// Other imports
const express = require("express")
const path = require("path")
const mongoose = require('mongoose')
const { check, validationResult } = require("express-validator")

// Web app server
const app = express()
const routes = require('./routes')
// Set up EJS and views
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data from form
app.use('/', routes)
//helper function to connect to MongoDB asychronously
const connectDB = async () => {
	try {
		console.log(`Attempting to connect to DB`);

		//use mongoose.connect() function to establish connection to MongoDB cluster
		mongoose.connect(CONNECTION_STRING)
			.then(() => console.log(`Database connection established successfully.`))
			.catch((err) =>
				console.log(`Can't established database connection : ${JSON.stringify(err)}`))
	} catch (error) {
		console.log(`Unable to connect to DB : ${error.message}`);
	}
}


const onServerStart = () => {
	console.log(`The server started running at http://localhost:${PORT}`);
	console.log(`Press Ctrl+c to stop`);

	//connect to database
	connectDB()
}

app.listen(PORT, onServerStart)
