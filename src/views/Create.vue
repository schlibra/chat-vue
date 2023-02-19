<template>
  <Nav title="创建一个房间"/>
  <Bread path="首页,加入房间,创建房间"/>
  <H1>创建一个房间</H1>
  <H2>创建一个属于你的房间</H2>
  <H4>在下方设置房间信息</H4>
  <Div width="14">
    <var-input placeholder="房间ID" v-model="roomId"/>
  </Div>
  <br>
  <var-space justify="space-around" size="[20, 20]">
    <span @click="enablePasswd = ! enablePasswd">启用密码：</span>
    <var-switch v-model="enablePasswd"/>
  </var-space>
  <br>
  <Div width="14" v-show="enablePasswd">
    <var-input placeholder="房间密码" v-model="roomPasswd" type="password"/>
  </Div>
  <br>
  <Div width="14">
    <var-button type="primary" @click="createRoom" block>创建房间</var-button>
  </Div>
  <Name />
</template>

<script setup>

import Nav from "@/components/Nav.vue";
import Bread from "@/components/Bread.vue";
import H1 from "@/components/H1.vue";
import H2 from "@/components/H2.vue";
import H4 from "@/components/H4.vue";
import Div from "@/components/Div.vue";
import {ref} from "vue";
import {Dialog} from "@varlet/ui";
import Name from "@/components/Name.vue";
import $cookies from "vue-cookie";

const roomId = ref("");
const enablePasswd = ref(false);
const roomPasswd = ref("");
const name = ref($cookies.get("name"));

function createRoom(){
  if (roomId.value.length === 0){
    Dialog({
      title:"错误",
      message:"房间ID不能为空",
      cancelButton: false
    });
    return;
  }
  if (!enablePasswd.value){
    roomPasswd.value = "";
  }
  fetch(`/createRoom?id=${roomId.value}&passwd=${roomPasswd.value}&name=${name.value}`,{
    method:'post'
  }).then(data=>data.text()).then(ret=>{
    switch (ret){
      case "Ok":
        Dialog({
          title:"成功",
          message:"房间创建成功！",
          cancelButton:false,
          onConfirm(){
            location.href="#/join";
          }
        });
        setTimeout(()=>{
          location.href="#/join";
        },1200);
    }
  });
}
</script>

<style scoped>
span{
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  cursor: pointer;
}
</style>