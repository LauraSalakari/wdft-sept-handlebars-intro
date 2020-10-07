require("dotenv").config(); // with the dotenv library we can access the .env file

const express = require("express");

const app = express();
const port = process.env.PORT; // this is how you access the .env file with the dotenv library

let { students, instructors } = require('./data');

app.use((req, res, next) => {
    console.log("Hello im the middleware");
    next();
});

app.use(express.static(__dirname + "/public"));

const hbs = require("hbs"); // create a variable for handlebars library

hbs.registerPartials(__dirname + "/views/partials"); //registering the directory location of the partials

app.set('view engine', 'hbs'); // make sure to connect the template engine BEFORE the routes are defined
// app.set creates some global variables

//views only works with dynamic files
// the code only uses this information with a DYNAMIC file
app.set('views', __dirname + '/views'); //the syntax of the app.set is app.set("key", value)

app.get("/", (req, res) => {
    res.render('landing.hbs', { name: "Laura", smiley: "c:", layout: false }); // sendFile for static files, render for dynamic files!
    // .hbs is the handlebars extension for dynamic html files
    // now the code finds a dynamic file, and then checks if the views keyword is set, if yes, then it follows that directory path and looks for the file with the name above
    // layout:false tells handlebars to not render the landing page with the handlebars template layout!
});

app.get("/students", (req, res) => {
    // we can do whatever logic we want inside this block!
    students.sort((a, b) => {
        if (a.name > b.name) return 1;
        else if (a.name < b.name) return -1;
        else return 0;
    });

    students = students.map((student) => {
        student.name = student.name.toUpperCase();
        return student;
    });

    res.render("students.hbs", { students });
});

app.get("/instructors", (req, res) => {
    instructors.sort((a, b) => {
        if (a.city > b.city) return 1;
        else if (a.city < b.city) return -1;
        else return 0;
    });

    res.render("instructors.hbs", { instructors });
});

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);