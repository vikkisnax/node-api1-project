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
                    message: "There was an error while saving the user to the database",
                    stack: error.stack,
                })
            })
    }
})


// [PUT] /api/users/:id (CRUpdateD user with :id using JSON payload)
server.put('/api/users/:id', async (req, res)=> {
    // 1- pull info from req
    const changes = req.body
    const { id } = req.params

    //crude validation of req.body
    if (!changes.name || !changes.bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user",
        })
    } else {
        try{
            const updatedUser = await User.update(id, changes)
            if (updatedUser){
                res.status(200).json(updatedUser)
            } else {
            res.status(404).json(
                {
                message: "The user with the specified ID does not exist" 
                })
            }
    } catch(error){
        res.status(500).json({
            error: error.message,
            message: "The user information could not be modified"})
    }
    }
})







// [DELETE] /api/users/:id (CRUDelete remove user with :id)
server.delete('/api/users/:id', (req, res)=>{
    // 1- gather info from the request object
    const { id } = req.params;
    // 2- interact with db
    User.remove(id)
        .then(deleted => {
            // 3- send appropriate response
            if(deleted) {
                res.status(200).json(deleted)
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist",
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error: error.message,
                message: "The user could not be removed",
                stack: error.stack,
            })
        })
})

//his code for delete- didn't pass npm test though
    // server.delete('/api/users/:id', (req, res)=>{
    // const possibleUser = await User.findById(req.params.id)
    // // console.log('possibleUser:', possibleUser)
   
    // if (!possibleUser){
    //     res.status(404).json({
    //         message: "The user with the specified ID does not exist",
    //     })
    // } else {
    //     const deletedUser = await User.remove(req.params.id)
    //     //or write param as possibleUser.id ^
    //     res.status(200).json(deletedUser)
    // }
    //})




//a test to make sure express works - if endpoints will works
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
