const server = require('./src/framework');

const port = process.env.PORT || 3001;

server.listen(port,()=>{
    console.log(`API Server started at port ${port}`);
});