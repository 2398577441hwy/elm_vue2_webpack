import Vue from "vue";
import router from "./route/router";
import store from './store'
import App from "./App.vue";
new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");