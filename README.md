# CPAN 212 -- Modern Web Technologies Assignment 2

Express app with EJS and Mongoose connection that allows for management of courses.
Courses contain course name, course code, and credits.
Web app will allow users to
- Enter/Add course detials
- View existing Course
- Modify the course fields
- Delete any course

## Set Up

To set up the app create a `.env` files with the following fields
- `PORT` with the port you want (8000)
- `CONNECTION_STRING` with your mongodb connection string

Then run `npm install` to install the requirements.

To test run `npm run dev` this will run a nodemon of the server off that port.

Full webapp deployment is not part of the assignment. 
