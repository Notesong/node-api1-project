// brings express into the project
const express = require('express');
// generates unique, random, url-friendly id's
const shortid = require('shortid');

// create a server object
const server = express();

// data store (replaces a DB)
let users = [];

// set server port for it to listen on
server.listen(4000, () => {
    console.log('Listening on port 4000...')
});

// parses request's body text into an object for req.body
server.use(express.json());

//      CRUD Operation      HTTP Method
//      --------------      -----------
//      Create..............POST
//      Read................GET
//      Update..............PUT
//      Delete..............DELETE

//
// handler for GET '/'
//
server.get('/', (req, res) => {
    res.send('Hello World!');
});

//
// handler for GET '/users'
//
server.get('/users', (req, res) => {
    res.server(200).json(users);
});

//
// handler for POST '/users'
//
server.post('/users', (req, res) => {
    // get the new user info from the request body
    const userInfo = req.body;

    // creates a user id using shortid
    userInfo.id = shortid.generate();

    // push the new user onto users array
    users.push(userInfo);

    // send back updated users
    res.status(201).json(users);
});

//
// handler for DELETE '/users/:id'
//
server.delete('/users/:id', (req, res) => {
    // get the user id from the request params
    const { id } = req.params;

    // if the user is in the database, set it to deleted
    const deleted = users.find(user => user.id === id);

    // if the user is found
    if (deleted) {
        //filter the user out of users array
        users = users.filter(user => user.id !== id);

        // send back the deleted user
        res.status(200).json(deleted);

    // if the user isn't found, return a 404 error message
    } else {
        res
            .status(404)
            .json({ success: false, message: "user id not found" })
    }
});

//
// handler for PUT '/users/:id'
//
server.put('/users/:id', (req, res) => {
    // get the user id from the request body
    const { id } = req.params;

    // get the user changes from the request body
    const changes = req.body;

    // find the user's index in users array
    let index = users.findIndex(user => user.id === id);

    // if the user is found
    if (index !== -1) {
        // set the changes to the user based on the user's index
        users[index] = changes;

        // send back the edited user
        res.status(200).json(users[index]);

    // if the user is not found, return a 404 error message
    } else {
        res
            .status(404)
            .json({ success: false, message: "user id not found" });
    }
});

//
// handler for PATCH '/users/:id'
//
server.patch('/users/:id', (req, res) => {
    // get the user id from the request body
    const { id } = req.params;

    // get the user changes from the request body
    const changes = req.body;

    // if the user is found in users array, set it to found
    let found = users.find(user => user.id === id);

    // if the user was found
    if (found) {
        // Object.assign() updates users array using the changes
        Object.assign(found, changes);

        // send the found user back
        res.status(200).json(found);
    // if the user was not found, return a 404 error message
    } else {
        res
            .status(404)
            .json({ success: false, message: "user id not found" })   
    }
});

//
// handler for GET '/users/:id'
//
server.get('/users/:id', (req, res) => {
    // get the user id from the request body
    const { id } = req.params;
    
    const found = users.find(user => user.id === id);

    // if the user is found based on id, return the user
    if (found) {
        res.status(200).json(found);
    // if the user isn't found, return a 404 error message
    } else {
        res
            .status(404)
            .json({ success: false, message: 'user not found'});
    }
});