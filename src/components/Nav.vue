<template>
<var-app-bar :title="props.title" title-position="center">
  <template #left>
    <var-button v-if="showHideBack" @click="backClick" color="transparent" round text><var-icon name="chevron-left" :size="24"></var-icon></var-button>
  </template>
  <template #right>
    <var-button color="transparent" round text><var-icon :name="currentThemeIcon" :size="24" @click="toggleTheme"/></var-button>
  </template>
</var-app-bar>
</template>

<script setup>
import { StyleProvider, Themes, Tooltip } from "@varlet/ui";
import {onMounted, ref} from "vue";
import $cookies from "vue-cookie";

let savedTheme = $cookies.get("theme") || "";
let currentTheme = savedTheme === "light" ? null : Themes.dark;
const currentThemeIcon = ref(currentTheme ? "weather-night" : "white-balance-sunny");
const props = defineProps(['title', 'hideBack']);
const showHideBack = props.hideBack !== 'true';

onMounted(()=>{
  StyleProvider(currentTheme);
});

function toggleTheme(){
  currentTheme = currentTheme ? null : Themes.dark;
  currentThemeIcon.value = currentTheme ? "weather-night" : "white-balance-sunny";
  savedTheme = currentTheme ? "dark" : "light";
  $cookies.set("theme", savedTheme);
  StyleProvider(currentTheme);
}

function backClick(){
  let path = window.location.hash;
  const i = path.lastIndexOf("/");
  path = path.substr(0,i);
  location.href = path;
}
</script>

<style scoped>
.var-app-bar{
  margin-bottom: 10px;
}
</style>