<template>
  <var-row v-if="position === 'left'">
    <var-col :span="1" style="margin-right: 20px;margin-top: 15px">
      <var-avatar color="#4a79f5" size="large">{{ props.item["userId"] }}</var-avatar>
    </var-col>
    <var-col :span="15">
      <div>
        <p style="margin-bottom: 0;display: block"><var-chip type="success" v-if="props['roomAdmin'] == props['item']['userId']">管理员</var-chip>&nbsp;&nbsp;{{ props.item["username"] }}</p>
        <slot style="clear: left;display: block;margin-top: 0" />
      </div>
    </var-col>
  </var-row>
  <var-space justify="end" v-else>
    <div>
      <p style="margin-bottom: 0;display: block"><var-chip type="success" v-if="props['roomAdmin'] == props['item']['userId']">管理员</var-chip>&nbsp;&nbsp;{{ props.item["username"] }}</p>
      <slot style="clear: left;display: block;margin-top: 0" />
    </div>
    <div  style="margin-right: 20px;margin-top: 15px">
      <var-avatar color="#4a79f5" size="large">{{ props.item["userId"] }}</var-avatar>
    </div>
  </var-space>
</template>

<script setup>
const props = defineProps(["position", "item", "roomAdmin"]);
</script>

<style scoped>

</style>