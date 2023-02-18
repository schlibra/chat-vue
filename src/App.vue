<script setup>
import { StyleProvider, Themes } from "@varlet/ui";
import {computed, onMounted, reactive, ref} from "vue";
import Index from "@/Index.vue";
import About from "@/About.vue";
import Join from "@/Join.vue";

const routes = {
  '/': Index,
  '/about': About,
  '/join': Join
}

const currentPath = ref(window.location.hash);
window.addEventListener('hashchange', ()=>{
  currentPath.value = window.location.hash;
});

const currentView = computed(()=>routes[currentPath.value.slice(1) || '/']);
</script>

<template>
  <component :is="currentView"/>
</template>

<style scoped>

</style>
