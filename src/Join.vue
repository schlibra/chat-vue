<template>
  <Nav title="加入一个房间"/>
  <Bread path="首页,加入房间"/>
  <H1>加入一个房间</H1>
  <H4>在下方输入房间的ID并加入</H4>
  <H4>即可享受局域网聊天</H4>
  <Div width="14" class="room-id-div">
    <var-input placeholder="输入房间ID" />
  </Div>
  <Div width="12">
    <var-button @click="joinClick" type="primary" size="large" block>加入</var-button>
  </Div>
  <var-snackbar :show="showMessage" type="info">{{ message }}</var-snackbar>

</template>

<script setup>
import Nav from "@/components/Nav.vue";
import Bread from "@/components/Bread.vue";
import H1 from "@/components/H1.vue";
import H2 from "@/components/H2.vue";
import H4 from "@/components/H4.vue";
import Div from "@/components/Div.vue";
import {ref} from "vue";

const message = ref("");
const showMessage = ref(false);
function joinClick(){
  fetch("/test",{
    method: 'post'
  }).then(data=>{
    return data.text();
  }).then(ret=>{
    console.log(ret);
    message.value = ret;
    showMessage.value=true;
  });
}


</script>

<style scoped>
.room-id-div{
  margin-bottom: 15px;
}
</style>