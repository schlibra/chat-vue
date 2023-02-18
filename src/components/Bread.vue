<template>
  <var-breadcrumbs>
    <var-breadcrumb v-for="item in path">{{ item }}</var-breadcrumb>
  </var-breadcrumbs>
</template>

<script setup>
const props = defineProps(["path"]);
const path = props.path.split(",")
</script>

<style scoped>
.var-breadcrumbs{
  margin-bottom: 10px;
}
</style>