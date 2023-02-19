<template>
  <Nav title="聊天室"/>
  <var-pull-refresh v-model="isRefresh" @refresh="refresh">
    <Bread path="首页,聊天室"/>
    <H2 style="margin-bottom: 0;" v-show="showFullTitle" @click="toggleFullTitle">欢迎来到聊天室</H2>
    <H4 style="margin-top: 0;margin-bottom: 0" @click="toggleFullTitle">房间ID：{{ roomId }}</H4>
    <H4 style="margin-top: 0;" v-show="showFullTitle" @click="toggleFullTitle">房间管理员：{{ roomAdminName }}（{{ roomAdmin }}）</H4>
  </var-pull-refresh>
  <Div width="18">
    <div class="main">
      <var-cell v-for="item in data.data">
        <Message
            :position="item['userId'] === clientIP ? 'right' : 'left'"
            :item="item"
            :roomAdmin="roomAdmin">
          <MsgText v-if="item.type === 'text'">{{ item.content }}</MsgText>
        </Message>
      </var-cell>
    </div>
  </Div>
  <Div width="18">
    <var-button type="primary" size="large" v-if="isMobile" block @click="showSendMessage = true">发送消息</var-button>
    <var-space v-else>
      <var-input placeholder="输入消息" v-model="message" @keydown.enter="sendMessage"/>
      <var-button @click="sendMessage" type="primary" size="large">发送消息</var-button>
    </var-space>
  </Div>
  <var-dialog :show="showSendMessage" title="输入消息" message="在下方输入消息" @cancel="showSendMessage = false" @confirm="sendMessage">
    <var-input placeholder="输入消息" v-model="message" @keydown.enter="sendMessage"/>
  </var-dialog>
  <var-snackbar @click="showNewMessage = false" :show="showNewMessage" type="success">收到新消息！</var-snackbar>

</template>

<script setup>
import Nav from "@/components/Nav.vue";
import Bread from "@/components/Bread.vue";
import Div from "@/components/Div.vue";
import H1 from "@/components/H1.vue";
import {onMounted, reactive, ref, watch} from "vue";
import $cookies from "vue-cookie";
import H2 from "@/components/H2.vue";
import {Dialog} from "@varlet/ui";
import Message from "@/components/Message.vue";
import MsgText from "@/components/MsgText.vue";
import H4 from "@/components/H4.vue";

const isRefresh = ref(false);
const _roomId = $cookies.get("roomId");
const roomId = ref(_roomId || "");
const roomAdmin = ref("");
const roomAdminName = ref("");
const clientIP = ref("");
const data = reactive({data: []});
const message = ref("");
const showSendMessage = ref(false);
const showFullTitle = ref(true);
const showNewMessage = ref(false);
let mainHeight = 40;
let count = 0;

function toggleFullTitle(){
  showFullTitle.value = !showFullTitle.value;
  mainHeight = showFullTitle.value ? 40 : 55;
  document.querySelector(".main").style.height = `${mainHeight}vh`;
}
function refresh() {
  getMessage();
  setTimeout(() => {
    isRefresh.value = false
  }, 2000);
}

function getMessage() {
  getRoomInfo();
  fetch(`/getMessage?id=${roomId.value}`, {
    method: 'post'
  }).then(data => {
    return data.text();
  }).then(ret => {
    isRefresh.value = false;
    if (!ret) {
      ret = `[{"type":"text","content":"Hello","username":"SCH","userId":"11"},{"type":"text","content":"Hello","username":"SCH","userId":"1"}]`;
    }
    data.data = JSON.parse(ret);
    // console.log(ret);
    if (data.data.length!==count){
      count = data.data.length;
      setTimeout(()=>{
        document.querySelector(".main").scrollTop=document.querySelector(".main").scrollHeight;
      },500);
      showNewMessage.value=true;
      setTimeout(()=>{
        showNewMessage.value=false;
      },1500);
    }
    getMessage();
    // setTimeout(getMessage, 10);
  });
}

function sendMessage() {
  showSendMessage.value = false;
  let name = $cookies.get("name");
  let id = clientIP.value;
  let _message = message.value;
  let rId = roomId.value;
  fetch(`/sendMessage?roomId=${rId}&name=${name}&id=${id}&content=${_message}`, {
    method: 'post'
  }).then(data => data.text()).then(ret => {
    message.value = "";
    switch (ret) {
      case "Ok":
        setTimeout(()=>{
          document.querySelector(".main").scrollTop=document.querySelector(".main").scrollHeight;
        },500);
        break;
      case "NotExist":
        Dialog({
          title: "错误",
          message: "消息发送失败",
          cancelButton: false
        })
        break;
    }
  });
}

function getRoomInfo() {
  fetch(`/getRoomInfo?id=${roomId.value}`, {
    method: 'post'
  }).then(data => data.text()).then(ret => {
    if (!ret) {
      ret = `{"admin":"11","adminName":"SCH","ip":"127.0.0.1"}`;
    }
    let data = JSON.parse(ret);
    // console.log(data);
    roomAdmin.value = data.admin;
    roomAdminName.value = data.adminName;
    let ip = data["ip"].split(".")[3];
    if (ip.length === 3) {
      ip = ip.substring(1);
    }
    clientIP.value = ip;

  });
}

onMounted(() => {
  if (roomId.value.length === 0) {
    Dialog({
      title: "错误",
      message: "你还没有加入房间，无法访问该页面，即将返回加入页面",
      cancelButton: false,
      onConfirm() {
        location.href = "#/join";
      }
    });
    setTimeout(() => {
      location.href = "#/join";
    }, 1200);
  } else {
    getMessage();
  }
})

let isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) ? true : false;

</script>

<style scoped>
.main {
  height: 40vh;
  width: 100%;
  background-color: rgba(200, 200, 200, .1);
  overflow: auto;
}
h1,h2,h4{
  cursor: pointer;
}
</style>