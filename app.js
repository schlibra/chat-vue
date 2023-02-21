const express = require('express');
const app = express();
const fs = require('fs');
const file = require('./utils/file');
const cookieParser = require('cookie-parser');
let data_str, data;
let request_count = 0;
function saveData(){
    data_str = JSON.stringify(data);
    fs.writeFile(__dirname + "/data/data",data_str,err => {
        if (err){
            console.log("数据保存失败");
        }
    });
    setTimeout(saveData,200);
}

app.use('/assets', express.static(__dirname+'/dist/assets/'));
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/dist/index.html');
    request_count++;
});

app.post('/checkRoom', (req, res)=>{
    const roomId = req.query.id;
    let result;
    if (data.list[roomId]){
        if (data.list[roomId].passwd){
            result = "NeedPasswd";
        }else {
            result = "Ok";
            res.cookie("roomId",roomId);
        }
    }else {
        result = "NotExist";
    }
    res.send(result);
    request_count++;
});

app.post('/joinRoom',(req,res)=>{
    const roomId = req.query.id;
    const passwd = req.query.passwd;
    let result;
    if (data.list[roomId]){
        if (data.list[roomId].passwd){
            if (data.list[roomId].passwd === passwd){
                result = "Ok";
                res.cookie("roomId",roomId);
            }else {
                result = "Error";
            }
        }else {
            result = "Ok";
            res.cookie("roomId",roomId);
        }
    }else {
        result = "NotExist";
    }
    res.send(result);
    request_count++;
});

app.post('/getMessage',(req,res)=>{
    let roomId = req.query.id;
    let result;
    if (data.data[roomId]){
        result = data.data[roomId];
    }else {
        data.data[roomId] = [];
        result = [];
    }
    res.send(JSON.stringify(result));
    request_count++;
});

app.post('/sendMessage',(req,res)=>{
    let roomId = req.query.roomId;
    let content = req.query.content;
    let name = req.query.name;
    let id = req.query.id;
    let result;
    if (data.data[roomId]){
        data.data[roomId].push({
            type:"text",
            content: content,
            username: name,
            userId: id
        });
        result = "Ok";
    }else {
        result = "NotExist";
    }
    res.send(result);
    request_count++;
});

app.post('/getRoomInfo',(req, res)=>{
    let roomId = req.query.id;
    let result=[];
    if (data.list[roomId]){
        result = {
            admin:data.list[roomId].adminId,
            adminName:data.list[roomId].admin,
            ip: req.ip
        }
    }else {
        result = {"admin":'',"error":"NotExist"}
    }
    res.send(JSON.stringify(result));
    request_count++;
});

app.post('/createRoom',(req, res)=>{
    const roomId = req.query.id;
    const roomPasswd = req.query.passwd;
    const name = req.cookies.name;
    let result;
    let ip = req.ip.split(".")[3];
    //if (ip.length === 3){
    //    ip = ip.substring(1);
    //}
    if (data.list[roomId]){
        result = "Exist";
    }else {
        data.list[roomId+""] = {
            adminId: ip,
            admin: name,
            passwd: roomPasswd
        }
        console.log("insert")
        result = "Ok";
    }
    res.send(result);
    request_count++;
});

app.post('/getRoomList',(req, res)=>{
    res.send(JSON.stringify(data.list));
    request_count++;
});

app.post('/test',(req,res)=>{
    res.send("Test post");
    request_count++;
});

app.get('/test',(req,res)=>{
    res.send(data_str);
    console.log(data);
    request_count++;
});

app.get('/getCount',(req, res)=>{
    res.send(request_count+"");
})

app.listen(80, "0.0.0.0",()=>{
    console.log("Server running!");
    file.mkdir(__dirname + "/data");
    data_str = fs.readFileSync(__dirname + "/data/data");
    if (data_str.length===0){
        data_str = "[]";
    }
    data = JSON.parse(data_str);
    if (data.length===0){
        console.log("Update data struct")
        data = {data:{},list:{}};
    }
    setTimeout(saveData,200);
});
