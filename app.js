const express = require('express');
const bodyParser = require('body-parser');
const db= require("./configuration/config");
const port = process.env.PORT;
require('dotenv').config();
const app = express();

let userType = null; // "administrator", "instructor", "trainee"
let currentUserId = null;

// add bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// general app setup
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("."));
app.set('scripts', './public/scripts');
app.set('views', './public/views');

// enhanced HTML renderer for SQL
app.set('view engine', 'ejs');

// go to login page on startup
app.get("/", function (req, res) {
    userType = null;
    res.sendFile(__dirname + "/public/views/" + "login.html");
})

// facilitate login
app.post("/login", function(req, res) {
    // ensure passwords match
    let passwordMatch = false;
    db.query("SELECT password FROM person WHERE perID = $1", [req.body.id], function (err, result) {
        if (err || result.rows[0] == null) {
            console.log(result.rows)
            res.json({success: false, message: "ID or Password is incorrect."})
        } else {
            // rows - returned list of objects from sql query
            if (req.body.password === result.rows[0].password) {
                passwordMatch = true;
            } else {
                res.json({success: false, message: "ID or Password is incorrect."})
            }
        }
        // determine what type of user is logging in
        if (passwordMatch) {
            // try checking if administrator
            db.query("SELECT perID FROM administrator WHERE perID = $1", [req.body.id], function (err, result) {
                if (err) {
                    userType = null;
                    currentUserId = null;
                    res.json({success: false, message: "System error."})
                } else if (result.rows[0] == null) {
                    // check if is instructor
                    db.query("SELECT perID FROM instructor WHERE perID = $1", [req.body.id], function(err, result) {
                        if (err) {
                            userType = null;
                            currentUserId = null;
                            res.json({success: false, message: "System error."})
                        } else if (result.rows[0] == null) {
                            // not in database
                            userType = null;
                            currentUserId = null;
                            res.json({success: false, message: "ID or Password incorrect."});
                        } else {
                            // know they are customer
                            userType = "instructor"
                            currentUserId = req.body.id;
                            res.json({success: true, message: "Instructor logged in."});
                        }
                    })
                } else {
                    // know they are administrator
                    userType = "administrator"
                    currentUserId = req.body.id;
                    res.json({success: true, message: "Administrator logged in."});
                }
            })
        }
    })
});

// Create New User
app.post("/create_user", (req, res) => {
    // Extract New Username and Password
    let {newUsername, newPassword} = req.body;

    // Check to see if Username already exists
    getPerIDQuery = "SELECT perID FROM person WHERE perID = $1";
    getPerIDValues = [newUsername];
    duplicatePerID = false;
    db.query(getPerIDQuery, getPerIDValues, (err, result) => {
        if (err) {
            console.log(err);
            res.json({success: false, message: 'Failed to create new user'});
        } else if (result.rowCount > 0) {
            duplicatePerID = true;
            res.json({success: false, message: 'ID already exists'});
        }

        // Create new user if perID is unique
        if (!duplicatePerID) {
            createPersonQuery = "INSERT INTO person(perID, password) VALUES($1, $2) RETURNING *";
            createPersonValues = [newUsername, newPassword];
            db.query(createPersonQuery, createPersonValues, (err, result) => {
                if (err) {
                    console.log(err);
                    res.json({success: false, message: 'Failed to create new user'});
                } else {
                    res.json({success: true, message: "New Account successfully created"});
                }
            });
        }

    })
});


// main menu screen
app.get("/menu", function (req, res) {
    if (userType == null) {
        res.sendFile(__dirname + "/public/views/" + "login.html")
    } else if (userType === "administrator") {
        res.render('administrator_menu', { user: currentUserId });
        res.end();
    } else if (userType === "instructor") {
        res.render('instructor_menu', { user: currentUserId });
        res.end();
    } else if (userType === "trainee") {
        res.render('trainee_menu', { user: currentUserId });
        res.end();
    }
})

// return all modules
app.get("/modules", function(req, res) {
    db.query("SELECT * FROM module",function(err, result) {
        if (err) {
            console.error("Server error.", err)
        } else if (currentUserId == null) {
            res.redirect("/");
        } else {
            // render ejs view for display table
            res.render('modules', { modules: result.rows });
            res.end();
        }
    });
})

// render page to create a module
app.get("/create_module", function (req, res) {
    res.render('create_module');
    res.end();
})

// add a module
app.post("/add_module", function (req, res) {
    db.query("INSERT INTO module (moduleID, moduleTitle, moduleDescription) VALUES ($1, $2, $3)", [req.body.moduleID, req.body.moduleTitle, req.body.moduleDescription], function (err, result) {
        console.log(err)
        if (err) {
            res.json({ success: false, message: "Error creating module." })
        } else {
            res.json({ success: true, message: "Module created successfully." })
        }
    });
});

// query database for admins
const getAdmin = (req, res) => {
    db.query('SELECT * FROM administrator', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json({
            status: 'success',
            requestTime: req.requestTime,
            data: results.rows,
        });
    })
};

// create a new admin
const createAdmin = (req, res) => {
    const { userID, password } = req.body;
    db.query(
        'INSERT INTO administrator (userID, password) VALUES ($1, $2)',
        [userID, password],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(201).send(`New admin created with ${results.insertId} ID`);
        });
};

app.route('/admin').get(getAdmin).post(createAdmin);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

module.exports = app;