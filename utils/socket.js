const express = require('express');
const expressWs = require('express-ws');

const router = express.Router();
expressWs(router);

router.ws("/chat",(ws,req)=>{
    ws.send("连接成功");
    console.log("WebSocket connect")
    ws.on('message',(msg)=>{
        ws.send("消息：" + msg);
        console.log("Message "+msg);
    });
});

module.exports=router;