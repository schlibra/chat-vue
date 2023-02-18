<template>
  <Nav title="首页" hideBack="true"/>
  <Bread path="首页"/>
  <H1>SCH的聊天室</H1>
  <H2>一个基于局域网通信的网页聊天程序</H2>
  <Div width="16">
    <var-button type="primary" size="large" block @click="gotoJoin">进入聊天室</var-button>
  </Div>
  <H4>你的昵称：{{ name }}
    <var-button type="primary" text @click="setNameShow = true">修改昵称</var-button>
  </H4>

  <var-dialog :show="setNameShow" cancel-button="false" cancel-button-text="" cancel-button-color="transparent"
              cancel-button-text-color="transparent" confirm-button-text="确定" @confirm="submitName">
    <template #title>
      <var-icon name="information" color="#2979ff"/>&nbsp;&nbsp;&nbsp;&nbsp;设置昵称
    </template>
    <p>{{ setNameHint }}</p>
    <var-cell>
      <var-input placeholder="输入昵称" v-model="name" @keydown.enter="submitName"/>
    </var-cell>
  </var-dialog>
  <var-snackbar :show="setNameErrorShow" type="error">昵称不能为空！</var-snackbar>
  <var-snackbar :show="setNameSuccessShow" type="success">昵称修改成功！</var-snackbar>
</template>

<script setup>
import Nav from "@/components/Nav.vue";
import Bread from "@/components/Bread.vue";
import Div from "@/components/Div.vue";
import H1 from "@/components/H1.vue";
import H2 from "@/components/H2.vue";
import H4 from "@/components/H4.vue";
import { ref } from "vue";
import $cookies from "vue-cookie";


const setNameShow = ref(false);
const setNameHint = ref("你还没有设置昵称，请在输入框中填写你的昵称：");
const setNameErrorShow = ref(false);
const setNameSuccessShow = ref(false);
let tmp_name;
try {
  tmp_name = $cookies.get("name").toString()
}catch (e){}
let name = ref(tmp_name || "");
console.log($cookies.get("name"));
if (name.value.length === 0){
  setNameShow.value=true;
}else {
  setNameHint.value="在下面输入新的昵称：";
}

function submitName() {
  setNameShow.value = false;
  if (name.value.length === 0) {
    setNameErrorShow.value = true;
    setNameShow.value=true;
  }else {
    $cookies.set("name",name.value);
    setNameSuccessShow.value=true;
  }
}

function gotoJoin(){
  location.href = "#/join";
}
</script>

<style scoped>

</style>