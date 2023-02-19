<template>
  <Nav title="加入一个房间"/>
  <Bread path="首页,加入房间"/>
  <H1>加入一个房间</H1>
  <H4>在下方输入房间的ID并加入</H4>
  <H4>即可享受局域网聊天</H4>
  <Div width="14" class="room-id-div">
    <var-input placeholder="输入房间ID" v-model="roomId" @keydown.enter="joinClick"/>
  </Div>
  <Div width="12">
    <var-button @click="joinClick" type="primary" size="large" block>加入</var-button>
  </Div>
  <br>
  <Div width="12">
    <var-button @click="gotoCreate" type="primary" size="large" block>创建聊天室</var-button>
  </Div>
  <br>
  <Div width="12">
    <var-button @click="gotoList" type="primary" size="large" block>房间列表</var-button>
  </Div>
  <Name />
  <var-snackbar :show="showMessage" type="info">{{ message }}</var-snackbar>
  <var-dialog :show="showInputPasswd" @cancel="showInputPasswd = false" @confirm="confirmPasswd">
    <template #title>
      <var-icon name="information" color="#2979ff"/>&nbsp;&nbsp;&nbsp;&nbsp;输入密码
    </template>
    <var-cell>该房间需要输入密码：</var-cell>
    <var-input placeholder="输入房间密码" v-model="roomPasswd" @keydown.enter="confirmPasswd"/>
  </var-dialog>

</template>

<script setup>
import Nav from "@/components/Nav.vue";
import Bread from "@/components/Bread.vue";
import H1 from "@/components/H1.vue";
import H2 from "@/components/H2.vue";
import H4 from "@/components/H4.vue";
import Div from "@/components/Div.vue";
import Name from "@/components/Name.vue";
import {ref} from "vue";
import {Dialog} from "@varlet/ui";

const message = ref("");
const showMessage = ref(false);
const roomId = ref("");
const roomPasswd = ref("");
const showInputPasswd = ref(false);

function joinClick() {
  if (roomId.value.length===0){
    Dialog({
      title:"错误",
      message:"房间ID不能为空，请重新输入",
      cancelButton: false
    });
    return;
  }
  fetch(`/checkRoom?id=${roomId.value}`, {
    method: 'post'
  }).then(data => {
    return data.text();
  }).then(ret => {
    switch (ret) {
      case "Ok":
        Dialog({
          title: "成功",
          message: "即将进入聊天室",
          cancelButton: false,
          closeOnClickOverlay: false,
          onConfirm() {location.href = "#/main";}
        });
        setTimeout(() => location.href = "#/main", 1500);
        break;
      case "NeedPasswd":
        showInputPasswd.value = true;
        break;
      case "NotExist":
        Dialog({
          title:"错误",
          message: "指定的房间ID不存在，请检查是否正确或创建这个房间",
          cancelButton: false
        });
        break;
      default:
        Dialog({
          title:"Debug",
          message: ret
        });
    }
  });
}

function confirmPasswd(){
  if (roomPasswd.value.length===0){
    Dialog({
      title:"错误",
      message:"密码不能为空",
      cancelButton: false,
      onConfirm(){showInputPasswd.value=true}
    });
  }else {
    fetch(`/joinRoom?id=${roomId.value}&passwd=${roomPasswd.value}`,{
      method: 'post'
    }).then(data=>{
      return data.text();
    }).then(ret=>{
      switch (ret){
        case "Ok":
          Dialog({
            title: "成功",
            message: "即将进入聊天室",
            cancelButton: false,
            closeOnClickOverlay: false,
            onConfirm() {location.href = "#/main";}
          });
          setTimeout(() => location.href = "#/main", 1500);
          break;
        case "Error":
          Dialog({
            title:"错误",
            message:"密码错误",
            cancelButton: false,
            onConfirm(){showInputPasswd.value=true}
          });
          break;
        case "NotExist":
          Dialog({
            title:"错误",
            message: "指定的房间ID不存在，请检查是否正确或创建这个房间",
            cancelButton: false
          });
          break;
        default:
          Dialog({
            title: "Debug",
            message:ret
          })
      }
    });
  }
}

function gotoCreate(){
  location.href = "#/join/create";
}
function gotoList(){
  location.href = "#/join/list";
}
</script>

<style scoped>
.room-id-div {
  margin-bottom: 15px;
}
</style>