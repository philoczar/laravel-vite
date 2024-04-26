//import './bootstrap';
import { createApp } from 'vue';
import App from './App.vue';
import {createPinia} from 'pinia';
import router from '../../routes/';
//import '../../bootstrap/css/bootstrap.css';

//vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
  theme: {
    defaultTheme: 'light'
  }
});
const pinia=createPinia();
const app = createApp(App);
app.use(vuetify);
app.use(pinia);
app.use(router);
app.mount('#app');
