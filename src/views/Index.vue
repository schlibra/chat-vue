<template>
  <Nav title="首页" hideBack="true"/>
  <Bread path="首页"/>
  <H1>SCH的聊天室</H1>
  <H2>一个基于局域网通信的网页聊天程序</H2>
  <Div width="16">
    <var-button type="primary" size="large" block @click="gotoJoin">进入聊天室</var-button>
  </Div>
  <Name />
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
import Name from "@/components/Name.vue";




function gotoJoin(){
  location.href = "#/join";
}
</script>

<style scoped>

</style>