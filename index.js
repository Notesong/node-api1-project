// brings express into the project
const express = require("express");
// generates unique, random, url-friendly id's
const shortid = require("shortid");

// create a server object
const server = express();

// data store (replaces a DB)
let users = [
  {
    id: shortid.generate(),
    name: "Jane Doe",
    bio: "Not Tarzan's Wife, another Jane."
  },
  {
    id: shortid.generate(),
    name: "John Doe",
    bio: "I'm just a guy."
  }
];

// set server port for it to listen on
server.listen(4000, () => {
  console.log("Listening on port 4000...");
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
server.get("/", (req, res) => {
  res.send("Hello World!");
});

//
// handler for GET '/api'
//
server.get("/api", (req, res) => {
  res.send("Hello API!");
});

//
// handler for GET '/api/users'
// returns all users
//
server.get("/api/users", (req, res) => {
  res.status(200).json({ success: true, users });
});

//
// handler for GET '/api/users/:id'
// returns a specific user based on id
//
server.get("/api/users/:id", (req, res) => {
  // get the user id from the request body
  const { id } = req.params;

  const found = users.find(user => user.id === id);

  // if the user is found based on id, return the user
  if (found) {
    res.status(200).json({ success: true, found });

    // if the user isn't found, return a 404 error message
  } else {
    res.status(404).json({
      success: false,
      message: "The user with the specified ID does not exist."
    });
  }
});

//
// handler for POST '/api/users'
//
server.post("/api/users", (req, res) => {
  try {
    // get the new user info from the request body
    const userInfo = req.body;

    if (!userInfo.name || !userInfo.bio) {
      res.status(400).json({
        success: false,
        message: "Please provide a name and bio for the user."
      });
    } else {
      // creates a user id using shortid
      userInfo.id = shortid.generate();

      // push the new user onto users array
      users.push(userInfo);

      newUser = users.filter(user => user.id === userInfo.id);

      // send back updated users
      res.status(201).json(newUser[0]);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There was an internal error while saving the user."
    });
  }
});

//
// handler for DELETE '/api/users/:id'
//
server.delete("/api/users/:id", (req, res) => {
  // get the user id from the request params
  const { id } = req.params;

  // if the user is in the database, set it to deleted
  const deleted = users.find(user => user.id === id);

  // if the user is found
  if (deleted) {
    //filter the user out of users array
    users = users.filter(user => user.id !== id);

    // send back the deleted user
    res.status(200).json({ success: true, deleted });

    // if the user isn't found, return a 404 error message
  } else {
    res.status(404).json({
      success: false,
      message: "The user with the specified ID does not exist."
    });
  }
});

//
// handler for PUT '/api/users/:id'
//
server.put("/api/users/:id", (req, res) => {
  // get the user id from the request body
  const { id } = req.params;

  // get the user changes from the request body
  const changes = req.body;

  if (!changes.name || !changes.bio) {
    res.status(400).json({
      success: false,
      message: "Please provide a name and bio for the user."
    });
  } else {
    // set the user id based off the params
    changes.id = id;

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
      res.status(404).json({
        success: false,
        message: "The user with the specified ID does not exist."
      });
    }
  }
});

//
// handler for PATCH '/api/users/:id'
//
server.patch("/api/users/:id", (req, res) => {
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
    res.status(200).json({ success: true, found });
    // if the user was not found, return a 404 error message
  } else {
    res.status(404).json({
      success: false,
      message: "The user with the specified ID does not exist."
    });
  }
});
