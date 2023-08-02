const server = require('./api/server');

const port = 9000;

// START YOUR SERVER HERE
// console.log('hey you nodemon test')
server.listen(port, () =>{
    // console.log('listening on', port)
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`)
})