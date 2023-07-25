// BUILD YOUR SERVER HERE

// IMPORTS
const express = require('express')

// INSTANCE OF EXPRESS APP
const server = express()

//test to make sure express works
//http :9000/foo/bar
server.use('*', (req, res) => {
    res.status(404).json({
        message: 'NOOOOOO'  
    })
})

// GLOBAL MIDDLEWARE - teaches express how to parse JSON from the request body
server.use(express.json())



// ENDPOINTS
// [GET]




// [GET]

// [POST]

// [PUT]

// [DELETE]

// EXPOSING THE SERVER TO OTHER MODULES - use 'sever' inside index.js
module.exports = server; // EXPORT YOUR SERVER instead of {}
