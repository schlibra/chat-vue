const express = require('express');
const app = express();
const fs = require('fs');
const file = require('./utils/file');

app.use('/assets', express.static(__dirname+'/dist/assets/'));

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/dist/index.html');
});

app.post('/test',(req,res)=>{
    res.send("Test post");
})

app.listen(80, "0.0.0.0",()=>{
    console.log("Server running!");
    file.mkdir(__dirname + "/data");
});
