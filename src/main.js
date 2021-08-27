import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element";
import "./plugins/highcharts";
import "./plugins/axios"; // 导入axios
import "./api/index"; // 导入api

Vue.prototype.modeHome = process.env.VUE_APP_MODE;
Vue.prototype.refreshTime = 180000;
// Vue.prototype.modeHome = process.env.MODE_HOME;
// console.log(process.env);
// console.log(process.env.VUE_APP_URL);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
