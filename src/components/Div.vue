<template>
  <var-row>
    <var-col :span="width" :offset="offset">
      <slot/>
    </var-col>
  </var-row>
</template>

<script setup>
const props = defineProps(["width"]);
const width = parseInt(props.width || 8);
const offset = (24 - width) / 2;
</script>

<style scoped>

</style>