<template>
  <Nav title="房间列表"/>
  <Bread path="首页,加入房间,房间列表"/>
  <H1>房间列表</H1>
  <H2>在下面可以看到所有房间的列表</H2>
  <var-space :size="[10, 10]" justify="center">
    <var-card
        v-for="(item, index) in list.data"
        ripple="true"
        outline
        :title="'房间编号：' + index "
        :subtitle="'是否加密：' + (item.passwd ? '是' : '否')">

      <var-cell>是否加密：{{ item.passwd ? "是" : "否" }}</var-cell>
    </var-card>
  </var-space>
</template>

<script setup>
import Nav from "@/components/Nav.vue";
import Bread from "@/components/Bread.vue";
import Div from "@/components/Div.vue";
import H1 from "@/components/H1.vue";
import H2 from "@/components/H2.vue";
import {onMounted, reactive} from "vue";

const list = reactive({data:[]});

onMounted(()=>{
  getRoomList();
});

function getRoomList(){
  fetch('/getRoomList',{
    method:'post'
  }).then(data=>data.text()).then(ret=>{
    if (!ret){
      ret = `{"1234":{"adminId":"1","admin":"SCH","passwd":"1234"},"3234":{"adminId":"1","admin":"SCH","passwd":"1234"},"2234":{"adminId":"1","admin":"SCH","passwd":"1234"}}`;
    }
    list.data = JSON.parse(ret);
  });
}
</script>

<style scoped>

</style>