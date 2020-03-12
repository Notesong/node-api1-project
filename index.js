// brings express into the project
const express = require('express');
// generates unique, random, url-friendly id's
const shortid = require('shortid');

// create a server object
const server = express();

// data store (replaces a DB)
let users = [];

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

});