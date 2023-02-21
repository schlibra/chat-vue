<script setup>
import { computed, ref } from "vue";
import Index from "@/views/Index.vue";
import About from "@/views/About.vue";
import Join from "@/views/Join.vue";
import Main from "@/views/Main.vue";
import Create from "@/views/Create.vue";
import List from "@/views/List.vue";

const routes = {
  '/': Index,
  '/about': About,
  '/join': Join,
  '/main': Main,
  '/join/create': Create,
  '/join/list': List
}

const currentPath = ref(window.location.hash);
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => routes[currentPath.value.slice(1) || '/']);
</script>

<template>
  <component :is="currentView"/>
</template>

<style>

</style>
