import App from '@/App.vue';
import Varlet from '@varlet/ui';
import { createApp } from "vue";
import '@varlet/ui/es/style';
import '@varlet/touch-emulator';
import '@/assets/global.css'
import VueCookies from 'vue-cookies'

createApp(App).use(Varlet).use(VueCookies).mount("#app");