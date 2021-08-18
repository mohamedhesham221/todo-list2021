import Vue from 'vue';
import draggable from 'vuedraggable';
import App from './App.vue';
import './registerServiceWorker';
import './scss/main.scss';

Vue.config.productionTip = false;
Vue.use(draggable);
const Bus = new Vue();
export default Bus;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
