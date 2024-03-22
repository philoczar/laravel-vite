import './bootstrap';
import { createApp } from 'vue';
import App from './App.vue';
import {createPinia} from 'pinia';
import router from '../../routes/';
import '../../bootstrap/css/bootstrap.css';

const pinia=createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
