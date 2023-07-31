// BUILD YOUR SERVER HERE

// IMPORTS
const express = require('express')
const User = require('./users/model')

// INSTANCE OF EXPRESS APP
const server = express()

//test to make sure express works (below)

// GLOBAL MIDDLEWARE - teaches express how to parse JSON from the request body
server.use(express.json())



// ENDPOINTS
// [GET] / hello world
server.get('/', (req, res)=>{
    res.send('HELLO FROM EXPRESS');
});

// [GET] /api/users (CReadUD, fetch all users)
server.get('/api/users', (req, res)=>{
    //1- gather info from the req object - look inside model.js and import it/require it above to define the data (User)
    //2- interact with db
    User.find()
        .then(users =>{
            // throw new Error('test error')
            //3A- send success response
            res.status(200).json(users)
        })
        .catch(error =>{
            //3B- send failed response
            res.status(500).json({
                message: 'error getting users',
                error: error.message,
                stack: error.stack,
            })
        })
})

// [GET] /api/users/:id
server.get('/api/users/:id', (req, res)=>{
    //get the param in the url - the word after :
    const {id} = req.params
    User.findById(id)
        .then(user => {
            // throw new Error('test error')
            user   
                ? res.status(200).json(user)
                : res.status(404).json({
                    message: `The user with the specified ID ${id} does not exist`
                })
        })
        .catch(error=>{
            res.status(500).json({
                message: "The users information could not be retrieved",
                error: error.message,
            })
        })
})

// [POST] /api/users (CreateRUD, create new user from JSON payload)
server.post('/api/users', (req, res) =>{
    // EXPRESS, BY DEFAULT IS NOT PARSING THE BODY OF THE REQUEST
    // 1- gather info from the request object
    const user = req.body;

    //crud validation of req.body
    if (!user.name || !user.bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user"
        })
    } else {
            // 2- interact with db
            User.insert(user)
            // 3- send appropriate response
                .then(created =>{
                    //will show in npm run server terminal tab
                    console.log("CREATED", created)
                    res.status(201).json(created)
            })
        .catch (error => {
            res.status(500).json({
                error: error.message,
                message: "There was an error while saving the user to the database"
            })
        })
    }
})


// [PUT]


// [DELETE]


//test to make sure express works - if endpoints will works
//put this below the other endpoints
server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'  
    })
})

// server.listen(9000, () =>
//   console.log('Server running on http://localhost:9000')
// );


// EXPOSING THE SERVER TO OTHER MODULES - use 'sever' inside index.js
module.exports = server; // EXPORT YOUR SERVER instead of {}
